import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';  // ✅ points to styles/index.css
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
