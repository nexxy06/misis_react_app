import React, { useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        image: null,
        caption: ''
    });
    const [cardNumber, setCardNumber] = useState(null);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        data.append('caption', formData.caption);
        data.append('image', formData.image);

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                body: data
            });
            
            const result = await response.json();
            if (response.ok) {
                setCardNumber(result.card_number);
                setMessage('Форма успешно отправлена!');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    image: null,
                    caption: ''
                });
            } else {
                setMessage(result.error || 'Ошибка при отправке формы');
            }
        } catch (error) {
            setMessage('Ошибка сети: ' + error.message);
        }
    };

    return (
        <div className="feedback-container">
            <header>
                <h1>Фото лягушек</h1>
                <nav>
                    <ul>
                        <li><a href="/">О лягушках</a></li>
                        <li><a href="/images">Фото</a></li>
                        <li><a href="/table">Таблица</a></li>
                        <li><a href="/registration">Обратная связь</a></li>
                    </ul>
                </nav>
            </header>

            <main>
                <section id="registration">
                    <h2>Обратная связь</h2>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
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

                        <label htmlFor="caption">Подпись к фото:</label>
                        <input 
                            type="text" 
                            id="caption" 
                            name="caption" 
                            value={formData.caption}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="image">Фото лягушки:</label>
                        <input 
                            type="file" 
                            id="image" 
                            name="image" 
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                        
                        <button type="submit">Отправить</button>
                    </form>
                    
                    {message && <p className="message">{message}</p>}
                    {cardNumber && <p className="card-number">Номер вашей карточки: {cardNumber}</p>}
                </section>
            </main>
        </div>
    );
};

export default FeedbackForm;