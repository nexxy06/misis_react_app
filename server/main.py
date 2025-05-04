from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename
import uuid

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max

# Словарь для хранения данных
feedback_data = {}

# Создаем папку для загрузок, если ее нет
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/api/feedback', methods=['POST'])
def handle_feedback():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file:
        # Генерируем уникальное имя файла
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4().hex}_{filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        file.save(filepath)
        
        # Генерируем номер карточки
        card_number = len(feedback_data) + 1
        
        # Сохраняем данные
        feedback_data[card_number] = {
            'image_filename': unique_filename,
            'caption': request.form.get('caption', ''),
            'sender_name': request.form.get('name', ''),
            'email': request.form.get('email', ''),
            'phone': request.form.get('phone', '')
        }
        
        return jsonify({
            'card_number': card_number,
            'message': 'Feedback received successfully'
        })
    
    return jsonify({'error': 'File upload failed'}), 500

if __name__ == '__main__':
    app.run(debug=True)