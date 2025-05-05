import React, { useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    caption: '',
    photo: null,
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('caption', formData.caption);
    data.append('photo', formData.photo);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Ошибка сервера');
      }

      const result = await response.json();
      setMessage(`Данные отправлены!`); // Файл: ${result.data.photo_filename}
    } catch (err) {
      setError(`Ошибка: ${err.message}`);
    }
  };

  return (
    <section id="registration">
    <div>
      <h2>Обратная связь</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Телефон:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Фото лягушки:</label>
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>

        <div>
          <label>Подпись к фото:</label>
          <textarea
            name="caption"
            value={formData.caption}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Отправить</button> 
      </form>
    </div>
    </section>
  );
};

export default FeedbackForm;