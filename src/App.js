// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Images from './components/Images';
import Table from './components/Table';
import Registration from './components/Registration';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/images" element={<Images />} />
            <Route path="/table" element={<Table />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Header() {
  return (
    <header>
      <h1>Фото лягушек</h1>
      <nav>
        <ul>
          <li><Link to="/">О лягушках</Link></li>
          <li><Link to="/images">Фото</Link></li>
          <li><Link to="/table">Таблица</Link></li>
          <li><Link to="/registration">Обратная связь</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default App;