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

frogs_data = [
    {
        "id": 1,
        "image": "/static/images/1image.jpg",
        "title": "Лягушка 1",
        "description": "<h1>Краткое описание лягушки 1.</h1> Обитает в тропических лесах.",
        "email": "Австратлия"
    },
    {
        "id": 2,
        "image": "/static/images/2image.jpg",
        "title": "Лягушка 2",
        "description": "Краткое описание лягушки 2. Ядовитый вид.",
        "email": "Индонезия"
    },
]

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
    image_path = f"/static/images/{filename}"

    # Добавить запись в frogs_data
    new_frog = {
        "id": len(frogs_data) + 1,
        "image": image_path,
        "title": request.form.get('name', f"Лягушка {len(frogs_data) + 1}"),
        "description": request.form.get('description', 'Описание отсутствует')
    }
    
    frogs_data.append(new_frog)


    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    return jsonify({
        "message": "Файл загружен!",
        "data": {
            "name": request.form.get('name'),
            "email": request.form.get('email'),
            "photo": filename,
            "description": request.form.get('description')
        }
    }), 200


@app.route('/api/frogs', methods=['GET'])
def get_frogs():
    return jsonify(frogs_data)

@app.route('/api/frogs/<int:frog_id>', methods=['GET'])
def get_frog(frog_id):
    frog = next((f for f in frogs_data if f['id'] == frog_id), None)
    if frog:
        return jsonify(frog)
    return jsonify({"error": "Лягушка не найдена"}), 404

@app.route('/static/images/<filename>')
def serve_image(filename):
    print("", filename)
    return send_from_directory('../uploads/', filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000)