# from flask import Flask, request, jsonify, send_from_directory
# from flask_cors import CORS
# import mysql.connector
# import os
# from werkzeug.utils import secure_filename

# UPLOAD_FOLDER = 'images'
# ALLOWED_EXT = {'png','jpg','jpeg','gif'}

# app = Flask(__name__)
# CORS(app)
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# # Configure MySQL connection (change to your values or use environment variables)
# DB_CONFIG = {
#     'host': os.environ.get('DB_HOST','localhost'),
#     'user': os.environ.get('DB_USER','root'),
#     'password': os.environ.get('DB_PASSWORD','Sanjana@123'),
#     'database': os.environ.get('DB_NAME','tourist_app')
# }

# def get_db_conn():
#     return mysql.connector.connect(**DB_CONFIG)

# @app.route('/api/places', methods=['GET'])
# def get_places():
#     conn = get_db_conn()
#     cur = conn.cursor(dictionary=True)
#     cur.execute('SELECT * FROM places')
#     rows = cur.fetchall()
#     cur.close(); conn.close()
#     return jsonify(rows)

# @app.route('/api/place/<int:place_id>', methods=['GET'])
# def get_place(place_id):
#     conn = get_db_conn()
#     cur = conn.cursor(dictionary=True)
#     cur.execute('SELECT * FROM places WHERE id=%s', (place_id,))
#     row = cur.fetchone()
#     cur.close(); conn.close()
#     return jsonify(row)

# @app.route('/api/place/<int:place_id>/hotels', methods=['GET'])
# def get_hotels(place_id):
#     conn = get_db_conn()
#     cur = conn.cursor(dictionary=True)
#     cur.execute('SELECT * FROM hotels WHERE place_id=%s', (place_id,))
#     rows = cur.fetchall()
#     cur.close(); conn.close()
#     return jsonify(rows)

# @app.route('/api/hotel/<int:hotel_id>/foods', methods=['GET'])
# def get_foods(hotel_id):
#     conn = get_db_conn()
#     cur = conn.cursor(dictionary=True)
#     cur.execute('SELECT * FROM foods WHERE hotel_id=%s', (hotel_id,))
#     rows = cur.fetchall()
#     cur.close(); conn.close()
#     return jsonify(rows)

# @app.route('/images/<path:filename>')
# def serve_image(filename):
#     return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
    
# @app.route('/api/place', methods=['POST'])
# def add_place():
#     data = request.json
#     conn = get_db_conn()
#     cur = conn.cursor()

#     # Ensure image path is "images/filename.jpg"
#     image_path = data["image"]
#     if not image_path.startswith("images/"):
#         image_path = "images/" + image_path

#     cur.execute(
#         "INSERT INTO places (name, image) VALUES (%s, %s)",
#         (data["name"], image_path)
#     )

#     conn.commit()
#     cur.close()
#     conn.close()

#     return jsonify({"message": "Place added successfully"})

# @app.route('/api/images', methods=['POST'])
# def upload_photo():
#     if 'photo' not in request.files:
#         return jsonify({'error':'no file part'}), 400
#     f = request.files['photo']
#     if f.filename == '':
#         return jsonify({'error':'no selected file'}), 400
#     filename = secure_filename(f.filename)
#     ext = filename.rsplit('.',1)[-1].lower()
#     if ext not in ALLOWED_EXT:
#         return jsonify({'error':'file type not allowed'}), 400
#     dest = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#     f.save(dest)
#     place_id = request.form.get('place_id')
#     hotel_id = request.form.get('hotel_id')
#     conn = get_db_conn()
#     cur = conn.cursor()
#     cur.execute('INSERT INTO photos (place_id, hotel_id, filename) VALUES (%s,%s,%s)',
#                 (place_id if place_id else None, hotel_id if hotel_id else None, filename))
#     conn.commit()
#     cur.close(); conn.close()
#     return jsonify({'filename': filename})

# @app.route('/images/<path:filename>')
# def serve_upload(filename):
#     return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import mysql.connector
import os
from werkzeug.utils import secure_filename
from datetime import datetime

# UPLOAD_FOLDER = 'images'
# ALLOWED_EXT = {'png','jpg','jpeg','gif'}

# app = Flask(__name__)
# CORS(app)
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)
# -----------------------------------------------------------------------------------

# UPLOAD_FOLDER = 'images'
# VIDEO_FOLDER = 'videos'
# ALLOWED_IMAGE_EXT = {'png','jpg','jpeg','gif'}
# ALLOWED_VIDEO_EXT = {'mp4','mov','avi','mkv','webm'}  # Added video extensions
# MAX_VIDEO_SIZE = 100 * 1024 * 1024  # 100MB max file size

# app = Flask(__name__)
# CORS(app)
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# app.config['VIDEO_FOLDER'] = VIDEO_FOLDER
# app.config['MAX_VIDEO_SIZE'] = MAX_VIDEO_SIZE

# # Create directories if they don't exist
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)
# os.makedirs(VIDEO_FOLDER, exist_ok=True)

# ... (DB_CONFIG remains the same)
# -------------------------------------------------------------------------------------------


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
# -----------------------------------------------------------------------


# Configure MySQL connection (change to your values or use environment variables)
DB_CONFIG = {
    'host': os.environ.get('DB_HOST','localhost'),
    'user': os.environ.get('DB_USER','root'),
    'password': os.environ.get('DB_PASSWORD','Sanjana@123'),
    'database': os.environ.get('DB_NAME','tourist_app')
}

def get_db_conn():
    return mysql.connector.connect(**DB_CONFIG)




# ... (keep all your existing routes as they are)

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
    if ext not in ALLOWED_EXT:
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

@app.route('/images/<path:filename>')
def serve_upload(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# ========== REVIEWS ROUTES - ADDED BELOW ==========

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
            if ext not in ALLOWED_EXT:
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
# --------------------------------------------------------------------------


# ----------------------------------------------------------------------------------------------------------

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

# ========== END OF REVIEWS ROUTES ==========

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)