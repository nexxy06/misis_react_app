from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from pathlib import Path

app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

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

if __name__ == '__main__':
    app.run(debug=True, port=5000)