// src/components/Registration.js
import React, { useState, useContext } from 'react';
import { FrogContext } from '../context/FrogContext';
import './Registration.css';

function Registration() {
  // Получаем функцию добавления лягушки из контекста
  const { addFrog } = useContext(FrogContext);

  // Состояние для данных формы
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    photoDescription: '',
  });

  // Состояние для загружаемого фото
  const [photo, setPhoto] = useState(null);
  
  // Состояние для превью фото
  const [photoPreview, setPhotoPreview] = useState(null);

  // Обработчик изменения текстовых полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Обработчик выбора файла
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      // Создаем временный URL для превью
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Сначала добавляем карточку с локальными данными
    const newFrog = {
      name: formData.name || 'Безымянная лягушка',
      description: formData.photoDescription || 'Нет описания',
      image: photoPreview || '/images/default-frog.png' // временный или дефолтный URL
    };
    addFrog(newFrog);

    // 2. Отправляем данные на сервер (если нужно)
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('photoDescription', formData.photoDescription);
      if (photo) {
        formDataToSend.append('photo', photo);
      }

      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        console.error('Ошибка при отправке на сервер');
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    }

    // 3. Очищаем форму после отправки
    setFormData({
      name: '',
      email: '',
      phone: '',
      photoDescription: '',
    });
    setPhoto(null);
    setPhotoPreview(null);
    
    // Можно добавить уведомление об успехе
    alert('Карточка лягушки добавлена!');
  };

  return (
    <section id="registration">
      <h2>Обратная связь</h2>
      <form onSubmit={handleSubmit}>
        {/* Поле для имени */}
        <label htmlFor="name">Имя:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        {/* Поле для email */}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        {/* Поле для телефона */}
        <label htmlFor="phone">Телефон:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        {/* Поле для загрузки фото */}
        <label htmlFor="photo">Фото лягушки:</label>
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          onChange={handlePhotoChange}
          required
        />

        {/* Превью загруженного фото */}
        {photoPreview && (
          <div className="photo-preview">
            <img 
              src={photoPreview} 
              alt="Предпросмотр" 
              style={{ 
                maxWidth: '200px', 
                margin: '10px 0',
                borderRadius: '4px'
              }} 
            />
          </div>
        )}

        {/* Поле для описания фото */}
        <label htmlFor="photoDescription">Описание лягушки:</label>
        <textarea
          id="photoDescription"
          name="photoDescription"
          value={formData.photoDescription}
          onChange={handleChange}
          rows="4"
          required
        />

        {/* Кнопка отправки */}
        <button type="submit">Добавить лягушку</button>
      </form>
    </section>
  );
}

export default Registration;