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