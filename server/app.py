# app.py
from flask import Flask, request, jsonify
import os

app = Flask(__name__)

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# server/app.py
@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        # Получаем данные формы
        name = request.form.get('name', 'Безымянная лягушка')
        description = request.form.get('photoDescription', 'Нет описания')
        
        # Обрабатываем загрузку файла
        if 'photo' in request.files:
            file = request.files['photo']
            if file.filename != '':
                filename = secure_filename(file.filename)
                filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(filepath)
                
                # Возвращаем URL для доступа к файлу
                return jsonify({
                    'success': True,
                    'imageUrl': f'/uploads/{filename}',
                    'name': name,
                    'description': description
                })
        
        return jsonify({'success': True, 'message': 'Данные получены'})
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)