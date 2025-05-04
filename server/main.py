from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Разрешить все CORS-запросы

app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/api/upload', methods=['POST', 'OPTIONS'])
def upload_file():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    if 'photo' not in request.files:
        return jsonify({"error": "Фото не загружено"}), 400

    file = request.files['photo']
    if file.filename == '':
        return jsonify({"error": "Файл не выбран"}), 400

    filename = file.filename
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