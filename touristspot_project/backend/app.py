
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import mysql.connector
import os
from werkzeug.utils import secure_filename
from datetime import datetime
import pickle
import json
import nltk
import re
import numpy as np
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

UPLOAD_FOLDER = 'images'
VIDEO_FOLDER = 'videos'
ALLOWED_IMAGE_EXT = {'png','jpg','jpeg','gif'}
ALLOWED_VIDEO_EXT = {'mp4','mov','avi','mkv','webm'}
MAX_VIDEO_SIZE = 100 * 1024 * 1024  # 100MB max file size

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['VIDEO_FOLDER'] = VIDEO_FOLDER
app.config['MAX_VIDEO_SIZE'] = MAX_VIDEO_SIZE

# Create directories if they don't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(VIDEO_FOLDER, exist_ok=True)

# Configure MySQL connection (change to your values or use environment variables)
DB_CONFIG = {
    'host': os.environ.get('DB_HOST','localhost'),
    'user': os.environ.get('DB_USER','root'),
    'password': os.environ.get('DB_PASSWORD','Sanjana@123'),
    'database': os.environ.get('DB_NAME','tourist_app')
}

def get_db_conn():
    return mysql.connector.connect(**DB_CONFIG)

# ========== CHATBOT GLOBAL VARIABLES ==========
chatbot_model = None
chatbot_training_data = []
chatbot_responses = {}

def load_chatbot_model():
    """Load the pre-trained chatbot model and data"""
    global chatbot_model, chatbot_training_data, chatbot_responses
    
    try:
        # Download NLTK data if not present
        try:
            nltk.data.find('tokenizers/punkt')
            nltk.data.find('corpora/stopwords')
            nltk.data.find('corpora/wordnet')
        except LookupError:
            print("📥 Downloading NLTK data...")
            nltk.download('punkt', quiet=True)
            nltk.download('stopwords', quiet=True)
            nltk.download('wordnet', quiet=True)
        
        # Try to load pre-trained model
        if os.path.exists('coorg_chatbot_model.pkl'):
            print("📂 Loading chatbot model...")
            with open('coorg_chatbot_model.pkl', 'rb') as f:
                chatbot_model = pickle.load(f)
            print("✅ Chatbot model loaded successfully")
        else:
            print("⚠️ Warning: Chatbot model not found. Run chatbot_model.py first.")
            chatbot_model = None
        
        # Load training data
        if os.path.exists('chatbot_training_data.json'):
            with open('chatbot_training_data.json', 'r') as f:
                chatbot_training_data = json.load(f)
            
            # Create response dictionary by intent
            for item in chatbot_training_data:
                intent = item['intent']
                response = item['response']
                if intent not in chatbot_responses:
                    chatbot_responses[intent] = []
                if response not in chatbot_responses[intent]:
                    chatbot_responses[intent].append(response)
            
            print(f"📊 Loaded {len(chatbot_training_data)} training examples")
        else:
            print("⚠️ Warning: Chatbot training data not found")
            # Create default responses
            chatbot_responses = {
                "greeting": ["Hello! Welcome to Coorg Tourism Assistant. How can I help you today?"],
                "places": ["Coorg has amazing places! Check out Abbey Falls, Raja Seat, Nagarhole National Park, and more in our 'Places to Go' section."],
                "help": ["I can help you with places to visit, best time to visit, how to reach, accommodation, and activities in Coorg."]
            }
            
    except Exception as e:
        print(f"❌ Error loading chatbot model: {str(e)}")
        chatbot_model = None

def preprocess_text(text):
    """Clean and preprocess input text for chatbot"""
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    words = nltk.word_tokenize(text)
    lemmatizer = WordNetLemmatizer()
    stop_words = set(stopwords.words('english'))
    words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]
    return ' '.join(words)

# Load chatbot model on server startup
print("\n" + "=" * 60)
print("🚀 STARTING COORG TOURISM BACKEND WITH CHATBOT")
print("=" * 60)
load_chatbot_model()
print("=" * 60)

# ========== CHATBOT ROUTES ==========
@app.route('/api/chatbot/chat', methods=['POST'])
def chatbot_chat():
    """Handle chatbot messages"""
    data = request.json
    user_message = data.get('message', '').strip()
    
    if not user_message:
        return jsonify({
            'response': '👋 Hello! I\'m your Coorg Tourism Assistant. Ask me about places like Abbey Falls, Raja Seat, Nagarhole, or travel tips!',
            'suggestions': ['Abbey Falls details?', 'Raja Seat timings?', 'Best time to visit?', 'Coorg food?']
        })
    
    try:
        print(f"\n🤖 CHATBOT REQUEST: '{user_message}'")
        
        # If model is loaded, use it for prediction
        if chatbot_model:
            processed_text = preprocess_text(user_message)
            
            # Check if the model can handle this input
            try:
                intent = chatbot_model.predict([processed_text])[0]
                confidence = np.max(chatbot_model.predict_proba([processed_text]))
                
                print(f"   📊 Model prediction: Intent='{intent}', Confidence={confidence:.2%}")
                
                if confidence < 0.15:  # Lowered threshold for better responses
                    # Enhanced keyword matching for low confidence
                    response = get_keyword_based_response(user_message)
                else:
                    # Get response for the predicted intent
                    responses = chatbot_responses.get(intent, ["I can help with Coorg travel information. What would you like to know?"])
                    response = np.random.choice(responses) if responses else f"Check our website for info about {intent.replace('_', ' ')} in Coorg!"
            except Exception as e:
                print(f"   ⚠️ Model prediction error: {e}")
                response = get_keyword_based_response(user_message)
        else:
            # Model not loaded - use keyword matching
            response = get_keyword_based_response(user_message)
        
        # Generate relevant suggestions based on query
        suggestions = get_suggestions_based_on_query(user_message)
        
        print(f"   ✅ Response sent: {response[:50]}...")
        
        return jsonify({
            'response': response,
            'suggestions': suggestions
        })
        
    except Exception as e:
        print(f"❌ Chatbot error: {str(e)}")
        return jsonify({
            'response': f"👋 Hello! For '{user_message}' in Coorg, I recommend visiting Abbey Falls (waterfall), Raja Seat (sunset point), or trying Pandi Curry (local food). What specific info do you need?",
            'suggestions': ['Abbey Falls?', 'Raja Seat?', 'Local food?', 'Accommodation?']
        })

def get_keyword_based_response(user_message):
    """Get response based on keyword matching"""
    user_lower = user_message.lower()
    
    # Enhanced keyword matching
    if any(word in user_lower for word in ['abbey', 'falls', 'waterfall']):
        return "🌊 **Abbey Falls**: Beautiful waterfall 8 km from Madikeri. 70 feet high, surrounded by coffee plantations. ⏰ Timings: 9 AM - 5 PM. 💰 Entry: ₹20 per person."
    elif any(word in user_lower for word in ['raja', 'seat', 'sunset']):
        return "🌅 **Raja Seat**: Famous sunset viewpoint in Madikeri with gardens & toy train. ⏰ Timings: 6 AM - 7 PM. 💰 Entry: ₹10 adults, ₹5 children. 🎵 Musical fountain: 6:30 PM."
    elif 'nagarhole' in user_lower or 'national park' in user_lower or 'safari' in user_lower:
        return "🐘 **Nagarhole National Park**: Wildlife sanctuary with tigers & elephants. 🚙 Safari timings: 6 AM & 3 PM. 📅 Booking required in advance. Closed on Tuesdays."
    elif 'golden temple' in user_lower or 'bylakuppe' in user_lower:
        return "🕌 **Golden Temple**: Tibetan monastery in Bylakuppe with 40-foot golden statues. ⏰ Timings: 9 AM - 6 PM. 🆓 Free entry. 📸 Photography allowed."
    elif 'tadiandamol' in user_lower or 'trek' in user_lower or 'peak' in user_lower:
        return "⛰️ **Tadiandamol**: Highest peak in Coorg (1,748m). 🥾 Trek: 4-5 hours round trip. 🧭 Difficulty: Moderate. 👨‍🦯 Guide recommended."
    elif 'dubare' in user_lower or 'elephant' in user_lower:
        return "🐘 **Dubare Elephant Camp**: Bathe & feed elephants on Cauvery riverbank. ⏰ Timings: 9 AM - 5:30 PM. 💰 Fees: ₹1000-1500 per person for interaction."
    elif 'madikeri' in user_lower or 'capital' in user_lower:
        return "🏙️ **Madikeri**: Capital of Coorg district. Must visit: Raja Seat, Abbey Falls, Madikeri Fort, Omkareshwara Temple. Perfect base for exploring Coorg."
    elif 'coffee' in user_lower or 'plantation' in user_lower:
        return "☕ **Coffee Plantations**: Coorg produces world-famous Arabica coffee! Many estates offer guided tours. Best time for visit: November to March."
    elif 'food' in user_lower or 'eat' in user_lower or 'cuisine' in user_lower or 'pandi' in user_lower:
        return "🍛 **Coorgi Food**: Must try dishes:\n• Pandi Curry (pork)\n• Kadambuttu (rice dumplings)\n• Bamboo Shoot Curry\n• Akki Roti\n• Noolputtu\n• Coorg coffee (best in India!)"
    elif 'weather' in user_lower or 'climate' in user_lower or 'season' in user_lower:
        return "🌤️ **Weather in Coorg**:\n• Best time: Oct-Mar (pleasant 15-25°C)\n• Monsoon: Jun-Sep (lush greenery, rain)\n• Summer: Apr-May (warm 25-35°C)\n• Current: Check weather app for updates"
    elif 'hotel' in user_lower or 'stay' in user_lower or 'accommodation' in user_lower or 'resort' in user_lower:
        return "🏨 **Accommodation**:\n• Luxury Resorts: ₹3000-15000/night\n• Homestays: ₹1500-5000/night\n• Budget Hotels: ₹1000-3000/night\n• Popular areas: Madikeri, Kushalnagar, Virajpet"
    elif 'how to reach' in user_lower or 'travel' in user_lower or 'distance' in user_lower:
        return "🚗 **Travel to Coorg**:\n✈️ Air: Mangalore (160km) or Bangalore (260km)\n🚂 Train: Mysore (120km)\n🚌 Road: Well-connected by buses/taxis\n⏱️ From Bangalore: 5-6 hours"
    elif 'best time' in user_lower or 'when to visit' in user_lower or 'season' in user_lower:
        return "📅 **Best Time to Visit**:\n✅ October to March: Perfect for sightseeing\n✅ December: Ideal weather, Christmas celebrations\n✅ Monsoon (Jun-Sep): Lush greenery, fewer crowds\n❌ Avoid: Heavy rain days in monsoon"
    elif any(word in user_lower for word in ['hello', 'hi', 'hey']):
        return "👋 Hello! I'm your Coorg travel assistant. Ask me about places, food, weather, or travel tips! What would you like to know?"
    elif any(word in user_lower for word in ['thank', 'thanks', 'thank you']):
        return "🙏 You're welcome! Have an amazing time in Coorg. Let me know if you need more help!"
    elif any(word in user_lower for word in ['bye', 'goodbye', 'see you']):
        return "👋 Goodbye! Hope you enjoy your Coorg adventure! Safe travels!"
    elif 'help' in user_lower or 'what can you do' in user_lower:
        return "ℹ️ **I can help with**:\n📍 Places to visit\n📅 Best time to visit\n🚗 How to reach\n🏨 Accommodation\n🍛 Food recommendations\n🎯 Activities & Adventures\n🛍️ Shopping tips\n🎎 Cultural information"
    else:
        return f"🤔 I can help with information about '{user_message}' in Coorg. Try asking about:\n• Specific places (Abbey Falls, Raja Seat, Nagarhole)\n• Best time to visit (October-March recommended)\n• How to reach (by air/train/road)\n• Accommodation options\n• Food recommendations (try Pandi Curry!)"

def get_suggestions_based_on_query(user_message):
    """Generate relevant suggestions based on user query"""
    user_lower = user_message.lower()
    
    if any(word in user_lower for word in ['abbey', 'falls', 'waterfall', 'raja', 'seat', 'nagarhole', 'golden', 'temple', 'dubare', 'tadiandamol']):
        return ["Timings?", "Entry fees?", "How to reach?", "Nearby hotels?", "Best time to visit?"]
    elif any(word in user_lower for word in ['food', 'eat', 'cuisine', 'pandi', 'coffee']):
        return ["Pandi Curry recipe?", "Coffee tasting spots?", "Best restaurants?", "Local sweets?", "Food tours?"]
    elif any(word in user_lower for word in ['weather', 'climate', 'season']):
        return ["December weather?", "Monsoon tips?", "What to pack?", "Best season?", "Temperature details?"]
    elif any(word in user_lower for word in ['hotel', 'stay', 'accommodation', 'resort']):
        return ["Budget options?", "Luxury resorts?", "Homestays?", "Madikeri hotels?", "Booking tips?"]
    elif any(word in user_lower for word in ['how to', 'reach', 'travel', 'distance', 'transport']):
        return ["From Bangalore?", "From Mysore?", "Local transport?", "Taxi rates?", "Bus schedules?"]
    elif any(word in user_lower for word in ['best time', 'when to visit']):
        return ["Weather details?", "Festival seasons?", "Crowd information?", "Off-season tips?", "Monthly guide?"]
    elif any(word in user_lower for word in ['hello', 'hi', 'hey']):
        return ["Best places in Coorg?", "Weather information?", "Accommodation options?", "Food recommendations?"]
    else:
        return [
            "Abbey Falls details?",
            "Raja Seat timings?",
            "Best time to visit?",
            "Coorg food recommendations?",
            "How to reach from Bangalore?",
            "Accommodation options?"
        ]

@app.route('/api/chatbot/suggestions', methods=['GET'])
def chatbot_suggestions():
    """Get quick question suggestions for chatbot"""
    return jsonify({
        'suggestions': [
            "What are the best places in Coorg?",
            "Tell me about Abbey Falls",
            "Raja Seat timings and entry fee?",
            "How is the weather in December?",
            "Where to stay in Madikeri?",
            "What is Coorg famous for?",
            "How to reach from Bangalore?",
            "Best time for trekking?",
            "Local food recommendations",
            "Shopping places in Coorg"
        ]
    })

@app.route('/api/chatbot/health', methods=['GET'])
def chatbot_health():
    """Chatbot health check"""
    return jsonify({
        'status': 'loaded' if chatbot_model else 'not_loaded',
        'model_exists': os.path.exists('coorg_chatbot_model.pkl'),
        'training_data_exists': os.path.exists('chatbot_training_data.json'),
        'training_examples': len(chatbot_training_data) if chatbot_training_data else 0,
        'service': 'Coorg Tourism Chatbot API'
    })

# ========== YOUR EXISTING ROUTES (KEEP THEM ALL) ==========

@app.route('/api/videos', methods=['POST'])
def upload_video():
    if 'video' not in request.files:
        return jsonify({'error': 'No video file provided'}), 400
    
    video_file = request.files['video']
    if video_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    filename = secure_filename(video_file.filename)
    ext = filename.rsplit('.', 1)[-1].lower()
    
    if ext not in ALLOWED_VIDEO_EXT:
        return jsonify({'error': 'Video file type not allowed. Allowed: mp4, mov, avi, mkv, webm'}), 400
    
    # Check file size
    video_file.seek(0, os.SEEK_END)
    file_size = video_file.tell()
    video_file.seek(0)
    
    if file_size > app.config['MAX_VIDEO_SIZE']:
        return jsonify({'error': f'Video file too large. Maximum size: {app.config["MAX_VIDEO_SIZE"] // (1024*1024)}MB'}), 400
    
    # Generate unique filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    unique_filename = f"video_{timestamp}_{filename}"
    dest = os.path.join(app.config['VIDEO_FOLDER'], unique_filename)
    
    try:
        video_file.save(dest)
        
        # Optional: Save to database if needed
        place_id = request.form.get('place_id')
        hotel_id = request.form.get('hotel_id')
        title = request.form.get('title', 'Untitled Video')
        description = request.form.get('description', '')
        
        conn = get_db_conn()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO videos (place_id, hotel_id, title, description, filename, file_size) VALUES (%s, %s, %s, %s, %s, %s)",
            (place_id if place_id else None, hotel_id if hotel_id else None, title, description, unique_filename, file_size)
        )
        conn.commit()
        video_id = cur.lastrowid
        cur.close()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'Video uploaded successfully',
            'id': video_id,
            'filename': unique_filename,
            'title': title,
            'description': description,
            'file_size': file_size,
            'url': f"/videos/{unique_filename}"
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/videos/<path:filename>')
def serve_video(filename):
    return send_from_directory(app.config['VIDEO_FOLDER'], filename)

@app.route('/api/places', methods=['GET'])
def get_places():
    conn = get_db_conn()
    cur = conn.cursor(dictionary=True)
    cur.execute('SELECT * FROM places')
    rows = cur.fetchall()
    cur.close(); conn.close()
    return jsonify(rows)

@app.route('/api/place/<int:place_id>', methods=['GET'])
def get_place(place_id):
    conn = get_db_conn()
    cur = conn.cursor(dictionary=True)
    cur.execute('SELECT * FROM places WHERE id=%s', (place_id,))
    row = cur.fetchone()
    cur.close(); conn.close()
    return jsonify(row)

@app.route('/api/place/<int:place_id>/hotels', methods=['GET'])
def get_hotels(place_id):
    conn = get_db_conn()
    cur = conn.cursor(dictionary=True)
    cur.execute('SELECT * FROM hotels WHERE place_id=%s', (place_id,))
    rows = cur.fetchall()
    cur.close(); conn.close()
    return jsonify(rows)

@app.route('/api/hotel/<int:hotel_id>/foods', methods=['GET'])
def get_foods(hotel_id):
    conn = get_db_conn()
    cur = conn.cursor(dictionary=True)
    cur.execute('SELECT * FROM foods WHERE hotel_id=%s', (hotel_id,))
    rows = cur.fetchall()
    cur.close(); conn.close()
    return jsonify(rows)

@app.route('/images/<path:filename>')
def serve_image(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
    
@app.route('/api/place', methods=['POST'])
def add_place():
    data = request.json
    conn = get_db_conn()
    cur = conn.cursor()

    # Ensure image path is "images/filename.jpg"
    image_path = data["image"]
    if not image_path.startswith("images/"):
        image_path = "images/" + image_path

    cur.execute(
        "INSERT INTO places (name, image) VALUES (%s, %s)",
        (data["name"], image_path)
    )

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message": "Place added successfully"})

@app.route('/api/images', methods=['POST'])
def upload_photo():
    if 'photo' not in request.files:
        return jsonify({'error':'no file part'}), 400
    f = request.files['photo']
    if f.filename == '':
        return jsonify({'error':'no selected file'}), 400
    filename = secure_filename(f.filename)
    ext = filename.rsplit('.',1)[-1].lower()
    if ext not in ALLOWED_IMAGE_EXT:
        return jsonify({'error':'file type not allowed'}), 400
    dest = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    f.save(dest)
    place_id = request.form.get('place_id')
    hotel_id = request.form.get('hotel_id')
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute('INSERT INTO photos (place_id, hotel_id, filename) VALUES (%s,%s,%s)',
                (place_id if place_id else None, hotel_id if hotel_id else None, filename))
    conn.commit()
    cur.close(); conn.close()
    return jsonify({'filename': filename})

@app.route('/api/reviews', methods=['POST'])
def add_review():
    try:
        spot_name = request.form.get('spotName')
        description = request.form.get('description')
        image = request.files.get('image')
        
        if not spot_name or not description:
            return jsonify({'error': 'Spot name and description are required'}), 400
        
        image_filename = None
        if image and image.filename != '':
            filename = secure_filename(image.filename)
            ext = filename.rsplit('.', 1)[-1].lower()
            if ext not in ALLOWED_IMAGE_EXT:
                return jsonify({'error': 'File type not allowed'}), 400
            
            # Add timestamp to make filename unique
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            image_filename = f"review_{timestamp}_{filename}"
            dest = os.path.join(app.config['UPLOAD_FOLDER'], image_filename)
            image.save(dest)
        
        # Save to database
        conn = get_db_conn()
        cur = conn.cursor()
        
        cur.execute(
            "INSERT INTO reviews (spot_name, description, image_path) VALUES (%s, %s, %s)",
            (spot_name, description, image_filename)
        )
        conn.commit()
        review_id = cur.lastrowid
        cur.close()
        conn.close()
        
        return jsonify({
            'id': review_id,
            'spotName': spot_name,
            'description': description,
            'image': f"images/{image_filename}" if image_filename else None,
            'timestamp': datetime.now().isoformat()
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/reviews', methods=['GET'])
def get_reviews():
    try:
        conn = get_db_conn()
        cur = conn.cursor(dictionary=True)
        cur.execute("SELECT * FROM reviews ORDER BY created_at DESC")
        reviews = cur.fetchall()
        cur.close()
        conn.close()
        
        return jsonify(reviews)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ========== HEALTH CHECK ==========
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'Coorg Tourism Backend',
        'chatbot_loaded': chatbot_model is not None,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/')
def home():
    return jsonify({
        'message': 'Coorg Tourism Backend is running!',
        'endpoints': {
            'places': '/api/places',
            'chatbot': '/api/chatbot/chat',
            'chatbot_suggestions': '/api/chatbot/suggestions',
            'chatbot_health': '/api/chatbot/health',
            'upload_video': '/api/videos',
            'upload_photo': '/api/images',
            'reviews': '/api/reviews'
        }
    })

if __name__ == '__main__':
    print("\n" + "=" * 60)
    print("✅ COORG TOURISM BACKEND READY")
    print("=" * 60)
    print(f"📡 Server running on: http://localhost:5000")
    print(f"🤖 Chatbot status: {'✅ Loaded' if chatbot_model else '❌ Not loaded'}")
    print(f"📊 Training examples: {len(chatbot_training_data)}")
    print(f"📁 Image upload folder: {UPLOAD_FOLDER}")
    print(f"🎬 Video upload folder: {VIDEO_FOLDER}")
    print("=" * 60)
    print("📚 Available endpoints:")
    print("   • /api/chatbot/chat (POST) - Chat with the AI assistant")
    print("   • /api/chatbot/suggestions (GET) - Get quick questions")
    print("   • /api/places (GET) - Get all tourist places")
    print("   • /api/reviews (GET/POST) - User reviews")
    print("   • /api/videos (POST) - Upload videos")
    print("=" * 60)
    app.run(host='0.0.0.0', port=5000, debug=True)
