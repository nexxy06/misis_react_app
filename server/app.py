# app.py
from flask import Flask, request, jsonify
import os

app = Flask(__name__)

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        # Get form data
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        photo_description = request.form.get('photoDescription')
        
        # Handle file upload
        if 'photo' in request.files:
            file = request.files['photo']
            if file.filename != '':
                filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
                file.save(filename)
        
        # Here you would typically save the data to a database
        print(f"Received data: {name}, {email}, {phone}, {photo_description}")
        
        return jsonify({'message': 'Data received successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)