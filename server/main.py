from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from pathlib import Path

app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB
# os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

def get_next_image_number():
    """Получает следующий номер для изображения"""
    upload_path = Path(app.config['UPLOAD_FOLDER'])
    existing_files = list(upload_path.glob('*image.*'))
    
    if not existing_files:
        return 1
    
    numbers = []
    for file in existing_files:
        try:
            num = int(file.name.split('image')[0])
            numbers.append(num)
        except ValueError:
            continue
    
    return max(numbers) + 1 if numbers else 1

@app.route('/api/upload', methods=['POST', 'OPTIONS'])
def upload_file():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    if 'photo' not in request.files:
        return jsonify({"error": "Фото не загружено"}), 400

    file = request.files['photo']
    if file.filename == '':
        return jsonify({"error": "Файл не выбран"}), 400

    next_num = get_next_image_number()
    file_ext = os.path.splitext(file.filename)[1]
    filename = f"{next_num}image{file_ext}"

    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    return jsonify({
        "message": "Файл загружен!",
        "data": {
            "name": request.form.get('name'),
            "email": request.form.get('email'),
            "photo": filename
        }
    }), 200

frogs_data = [
    {
        "id": 1,
        "image": "/static/images/1image.jpg",
        "title": "Лягушка 1",
        "description": "Краткое описание лягушки 1. Обитает в тропических лесах."
    },
    {
        "id": 2,
        "image": "/static/images/small-image1.png",
        "title": "Лягушка 2",
        "description": "Краткое описание лягушки 2. Ядовитый вид."
    },
    {
        "id": 3,
        "image": "/static/images/small-image1.png",
        "title": "Лягушка 3",
        "description": "Краткое описание лягушки 3. Древолаз."
    }
]

@app.route('/api/frogs', methods=['GET'])
def get_frogs():
    return jsonify(frogs_data)

@app.route('/static/images/<filename>')
def serve_image(filename):
    print("", filename)
    return send_from_directory('../uploads/', filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000)