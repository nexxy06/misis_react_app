// Registration.js
import React, { useState } from 'react';
import './Registration.css';

function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    photoDescription: '',
  });
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('photoDescription', formData.photoDescription);
    if (photo) {
      data.append('photo', photo);
    }

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        alert('Данные успешно отправлены!');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          photoDescription: '',
        });
        setPhoto(null);
      } else {
        alert('Ошибка при отправке данных');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ошибка сети');
    }
  };

  return (
    <section id="registration">
      <h2>Обратная связь</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Имя:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <label htmlFor="phone">Телефон:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <label htmlFor="photo">Фото:</label>
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          onChange={handlePhotoChange}
        />

        <label htmlFor="photoDescription">Описание фото:</label>
        <textarea
          id="photoDescription"
          name="photoDescription"
          value={formData.photoDescription}
          onChange={handleChange}
          rows="4"
        />

        <button type="submit">Отправить</button>
      </form>
    </section>
  );
}

export default Registration;