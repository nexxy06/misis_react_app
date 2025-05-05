import React from 'react';
// import './Images.css'; // Подключаем стили (если нужны)

function Images() {
  return (
    <div>
      <h2>Фото лягушек</h2>
      <img 
        src="http://localhost:5000/static/images/1image.jpg" 
        alt="Фото лягушки"
        onError={(e) => {
          e.target.src = '/placeholder-frog.png';
        }}
      />
      <p>Галерея фотографий...</p>
    </div>
  );
}

export default Images;