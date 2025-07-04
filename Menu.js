// src/components/Menu.js
import React, { useState } from 'react';
import '../styles/Menu.css';

const Menu = ({ onLogout, darkMode, toggleDarkMode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="menu-container">
      <div
        className={`hamburger ${darkMode ? 'dark' : ''}`}
        onClick={() => setOpen(!open)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      {open && (
        <div className={`dropdown ${darkMode ? 'dark' : ''}`}>
          <button onClick={toggleDarkMode}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button onClick={onLogout}>🚪 Logout</button>
        </div>
      )}
    </div>
  );
};

export default Menu;
