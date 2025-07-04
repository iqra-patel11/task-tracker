import React, { useState } from 'react';
import '../styles/App.css'; // ✅ This is enough

function Login({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('username', username);
      onLogin(username);
    }
  };

  return (
    <div className="login-container">
     <form onSubmit={handleSubmit} className="login-form">
  <h2>Login</h2>
  <input
    type="text"
    placeholder="Enter your name"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    required
  />
  <button type="submit">Login</button>
</form>

    </div>
  );
}

export default Login;
