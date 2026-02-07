
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import json
import nltk
import re
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for React app

# Initialize chatbot components
nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('wordnet', quiet=True)

from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

# Global variables for model and data
model = None
training_data = []
intent_responses = {}

def load_model_and_data():
    """Load the trained model and training data"""
    global model, training_data, intent_responses
    
    try:
        print("🔧 Loading chatbot model and data...")
        
        # Load pre-trained model
        if os.path.exists('coorg_chatbot_model.pkl'):
            with open('coorg_chatbot_model.pkl', 'rb') as f:
                model = pickle.load(f)
            print("✅ Chatbot model loaded successfully")
        else:
            print("❌ Model file not found: coorg_chatbot_model.pkl")
            print("💡 Run: python chatbot_model.py to train the model")
            model = None
        
        # Load training data
        if os.path.exists('chatbot_training_data.json'):
            with open('chatbot_training_data.json', 'r') as f:
                training_data = json.load(f)
            
            # Create intent to responses mapping
            for item in training_data:
                intent = item['intent']
                response = item['response']
                if intent not in intent_responses:
                    intent_responses[intent] = []
                if response not in intent_responses[intent]:
                    intent_responses[intent].append(response)
            
            print(f"📊 Loaded {len(training_data)} training examples")
            print(f"📋 Found {len(intent_responses)} unique intents")
        else:
            print("❌ Training data file not found: chatbot_training_data.json")
            training_data = []
        
    except Exception as e:
        print(f"❌ Error loading model/data: {str(e)}")
        model = None
        training_data = []

def preprocess_text(text):
    """Clean and preprocess input text"""
    if not text:
        return ""
    
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    words = nltk.word_tokenize(text)
    words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]
    return ' '.join(words)

def get_keyword_based_response(user_message):
    """Get response based on keyword matching for fallback"""
    user_lower = user_message.lower()
    
    # Enhanced keyword matching
    keyword_responses = {
        'abbey': "🌊 **Abbey Falls**: Beautiful waterfall 8 km from Madikeri. 70 feet high, surrounded by coffee plantations. ⏰ Timings: 9 AM - 5 PM. 💰 Entry: ₹20 per person.",
        'falls': "🌊 **Abbey Falls**: Stunning waterfall near Madikeri. Perfect for photography. Best visited October to December when water flow is maximum.",
        'raja seat': "🌅 **Raja Seat**: Famous sunset viewpoint in Madikeri with gardens & toy train. ⏰ Timings: 6 AM - 7 PM. 💰 Entry: ₹10 adults, ₹5 children.",
        'nagarhole': "🐘 **Nagarhole National Park**: Wildlife sanctuary with tigers & elephants. 🚙 Safari timings: 6 AM & 3 PM. 📅 Booking required. Closed Tuesdays.",
        'golden temple': "🕌 **Golden Temple**: Tibetan monastery in Bylakuppe with 40-foot golden statues. ⏰ Timings: 9 AM - 6 PM. 🆓 Free entry.",
        'tadiandamol': "⛰️ **Tadiandamol**: Highest peak in Coorg (1,748m). 🥾 Trek: 4-5 hours round trip. 🧭 Difficulty: Moderate.",
        'dubare': "🐘 **Dubare Elephant Camp**: Bathe & feed elephants on Cauvery riverbank. ⏰ Timings: 9 AM - 5:30 PM.",
        'madikeri': "🏙️ **Madikeri**: Capital of Coorg. Visit Raja Seat, Abbey Falls, Madikeri Fort, Omkareshwara Temple.",
        'coffee': "☕ **Coffee Plantations**: Coorg produces world-famous Arabica coffee! Many estates offer guided tours.",
        'food': "🍛 **Coorgi Food**: Must try: Pandi Curry (pork), Kadambuttu (rice dumplings), Bamboo Shoot Curry, and Coorg coffee!",
        'weather': "🌤️ **Weather**: Best time: Oct-Mar (pleasant). Monsoon: Jun-Sep (lush). Summer: Apr-May (warm).",
        'hotel': "🏨 **Accommodation**: Options: Resorts (₹3000+), Homestays (₹1500-3000), Hotels (₹1000-2000).",
        'reach': "🚗 **Travel**: By air: Mangalore/Bangalore. By train: Mysore. By road: Well-connected.",
        'best time': "📅 **Best Time**: October to March for pleasant weather. December is perfect!",
        'trek': "🥾 **Trekking**: Best treks: Tadiandamol (hard), Brahmagiri (moderate), Nishani Motte (easy).",
        'shopping': "🛍️ **Shopping**: Buy coffee beans, spices, honey, homemade chocolates, Kodava jewelry.",
    }
    
    # Check each keyword
    for keyword, response in keyword_responses.items():
        if keyword in user_lower:
            return response
    
    # If no keyword matches, try to match with training data intents
    if training_data:
        # Look for exact matches in training data texts
        for item in training_data:
            if item['text'].lower() in user_lower:
                return item['response']
    
    return f"🤔 I can help with information about '{user_message}' in Coorg. Try asking about specific places like Abbey Falls, Raja Seat, or general topics like best time to visit, local food, or accommodation options."

def get_contextual_suggestions(user_message):
    """Get relevant suggestions based on user query"""
    user_lower = user_message.lower()
    
    if any(word in user_lower for word in ['abbey', 'falls', 'waterfall']):
        return ["Abbey Falls timings?", "Entry fee for Abbey Falls?", "How to reach Abbey Falls?", "Best time to visit Abbey Falls?"]
    elif any(word in user_lower for word in ['raja', 'seat', 'sunset']):
        return ["Raja Seat timings?", "Raja Seat entry fee?", "Musical fountain show time?", "Nearby places to Raja Seat?"]
    elif 'nagarhole' in user_lower:
        return ["Nagarhole safari timings?", "Safari booking process?", "Nagarhole entry fee?", "Animals in Nagarhole?"]
    elif 'golden temple' in user_lower:
        return ["Golden Temple timings?", "Best time to visit Golden Temple?", "Photography rules?", "Nearby attractions?"]
    elif 'tadiandamol' in user_lower:
        return ["Tadiandamol trek difficulty?", "Trek duration?", "Guide required?", "Best season for trekking?"]
    elif 'dubare' in user_lower:
        return ["Dubare elephant interaction cost?", "Timings for elephant bathing?", "Age restrictions?", "Booking in advance?"]
    elif any(word in user_lower for word in ['food', 'eat', 'cuisine']):
        return ["Best Coorgi restaurants?", "Pandi Curry recipe?", "Vegetarian options?", "Coffee tasting places?"]
    elif any(word in user_lower for word in ['weather', 'climate']):
        return ["Current weather in Coorg?", "Monthly temperature chart?", "Monsoon rainfall?", "What to pack?"]
    elif any(word in user_lower for word in ['hotel', 'stay', 'accommodation']):
        return ["Budget hotels in Madikeri?", "Luxury resorts?", "Homestay recommendations?", "Booking tips?"]
    elif any(word in user_lower for word in ['how to', 'reach', 'travel']):
        return ["Distance from Bangalore?", "Bus services to Coorg?", "Taxi rates?", "Self-drive options?"]
    else:
        return [
            "Abbey Falls details?",
            "Raja Seat timings?",
            "Best time to visit Coorg?",
            "Local food recommendations?",
            "Accommodation options?",
            "Trekking spots in Coorg?"
        ]

# Load model on startup
load_model_and_data()

@app.route('/api/chatbot/chat', methods=['POST'])
def chat():
    """Handle chatbot messages"""
    data = request.json
    user_message = data.get('message', '').strip()
    
    print(f"\n📨 Chatbot request: '{user_message}'")
    
    if not user_message:
        return jsonify({
            'response': '👋 Hello! I\'m your Coorg Tourism Assistant. Ask me about places like Abbey Falls, Raja Seat, Nagarhole, or travel tips!',
            'suggestions': ['Tell me about Abbey Falls', 'Raja Seat timings?', 'Best time to visit?', 'Coorg food recommendations?']
        })
    
    try:
        # If model is not loaded, use keyword matching
        if model is None:
            print("⚠️ Model not loaded, using keyword matching")
            response = get_keyword_based_response(user_message)
            suggestions = get_contextual_suggestions(user_message)
            
            return jsonify({
                'response': response,
                'suggestions': suggestions
            })
        
        # Preprocess and predict
        processed_text = preprocess_text(user_message)
        
        try:
            intent = model.predict([processed_text])[0]
            confidence = np.max(model.predict_proba([processed_text]))
            
            print(f"   🔍 Predicted intent: '{intent}' with confidence: {confidence:.2%}")
            
            # Use a lower confidence threshold (0.1 instead of 0.3)
            if confidence < 0.1:
                print(f"   ⚠️ Low confidence ({confidence:.2%}), using keyword fallback")
                response = get_keyword_based_response(user_message)
            else:
                # Get response for the predicted intent
                responses = intent_responses.get(intent, [])
                if responses:
                    response = np.random.choice(responses)
                    print(f"   ✅ Using model response for intent: '{intent}'")
                else:
                    response = get_keyword_based_response(user_message)
                    print(f"   ⚠️ No responses for intent '{intent}', using keyword fallback")
        
        except Exception as e:
            print(f"   ❌ Model prediction error: {str(e)}")
            response = get_keyword_based_response(user_message)
        
        # Generate context-aware suggestions
        suggestions = get_contextual_suggestions(user_message)
        
        print(f"   📤 Response sent successfully")
        
        return jsonify({
            'response': response,
            'suggestions': suggestions
        })
        
    except Exception as e:
        print(f"❌ Chatbot error: {str(e)}")
        return jsonify({
            'response': "😊 Hello! I'm here to help with Coorg travel information. For specific places like Abbey Falls, Raja Seat, or general travel tips, feel free to ask!",
            'suggestions': ['Abbey Falls?', 'Raja Seat?', 'Best time to visit?', 'Local food?']
        })

@app.route('/api/chatbot/suggestions', methods=['GET'])
def get_suggestions():
    """Get quick question suggestions"""
    return jsonify({
        'suggestions': [
            "Tell me about Abbey Falls",
            "Raja Seat timings and entry fee?",
            "Best time to visit Coorg?",
            "How to reach Coorg from Bangalore?",
            "Coorg food recommendations",
            "Hotels in Madikeri?",
            "Nagarhole safari details",
            "Trekking spots in Coorg",
            "Shopping places in Coorg",
            "Weather in December"
        ]
    })

@app.route('/api/chatbot/health', methods=['GET'])
def chatbot_health():
    """Check chatbot health status"""
    health_status = {
        'status': 'healthy',
        'model_loaded': model is not None,
        'training_data_loaded': len(training_data) > 0,
        'training_examples': len(training_data),
        'unique_intents': len(intent_responses),
        'timestamp': datetime.now().isoformat(),
        'message': 'Coorg Tourism Chatbot API is running'
    }
    
    if model is None:
        health_status['status'] = 'warning'
        health_status['message'] = 'Chatbot model not loaded. Run chatbot_model.py first.'
    elif len(training_data) == 0:
        health_status['status'] = 'warning'
        health_status['message'] = 'Training data not loaded.'
    
    return jsonify(health_status)

@app.route('/api/chatbot/reload', methods=['POST'])
def reload_model():
    """Reload the chatbot model and data (admin endpoint)"""
    try:
        load_model_and_data()
        return jsonify({
            'success': True,
            'message': 'Chatbot model and data reloaded successfully',
            'model_loaded': model is not None,
            'training_examples': len(training_data)
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error reloading model: {str(e)}'
        }), 500

@app.route('/api/chatbot/test', methods=['GET'])
def test_chatbot():
    """Test endpoint to verify chatbot is working"""
    test_queries = [
        "Hello",
        "Abbey Falls",
        "Best time to visit Coorg",
        "Coorg food",
        "Thank you"
    ]
    
    results = []
    for query in test_queries:
        try:
            processed = preprocess_text(query)
            if model:
                intent = model.predict([processed])[0]
                confidence = np.max(model.predict_proba([processed]))
            else:
                intent = "model_not_loaded"
                confidence = 0.0
            
            results.append({
                'query': query,
                'processed': processed,
                'intent': intent,
                'confidence': float(confidence)
            })
        except Exception as e:
            results.append({
                'query': query,
                'error': str(e)
            })
    
    return jsonify({
        'status': 'test_complete',
        'model_loaded': model is not None,
        'test_queries': results
    })

@app.route('/')
def home():
    return jsonify({
        'service': 'Coorg Tourism Chatbot API',
        'version': '1.0',
        'endpoints': {
            'chat': '/api/chatbot/chat (POST)',
            'suggestions': '/api/chatbot/suggestions (GET)',
            'health': '/api/chatbot/health (GET)',
            'reload': '/api/chatbot/reload (POST)',
            'test': '/api/chatbot/test (GET)'
        },
        'message': 'Send POST requests to /api/chatbot/chat with {"message": "your question"}'
    })

if __name__ == '__main__':
    print("\n" + "=" * 60)
    print("🤖 COORG TOURISM CHATBOT API")
    print("=" * 60)
    print(f"📡 Server running on: http://localhost:5001")
    print(f"🔧 Model status: {'✅ Loaded' if model else '❌ Not loaded'}")
    print(f"📊 Training examples: {len(training_data)}")
    print(f"📋 Unique intents: {len(intent_responses)}")
    print("\n📚 Available endpoints:")
    print("   • /api/chatbot/chat (POST) - Chat with the assistant")
    print("   • /api/chatbot/suggestions (GET) - Get quick questions")
    print("   • /api/chatbot/health (GET) - Check chatbot health")
    print("   • /api/chatbot/test (GET) - Test chatbot functionality")
    print("\n💡 Example request:")
    print('   curl -X POST http://localhost:5001/api/chatbot/chat \\')
    print('        -H "Content-Type: application/json" \\')
    print('        -d \'{"message": "Tell me about Abbey Falls"}\'')
    print("=" * 60)
    
    app.run(host='0.0.0.0', port=5000, debug=True)