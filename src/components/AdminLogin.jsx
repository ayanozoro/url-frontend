// src/components/AdminLogin.js
import React, { useState } from 'react';
import { API_BASE_URL } from '../config';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = btoa(`${username}:${password}`);

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin`, {
        headers: {
          'Authorization': `Basic ${credentials}`,
        },
      });

      if (!res.ok) throw new Error('Invalid credentials');

      const data = await res.json();
      localStorage.setItem('auth', credentials);
      onLogin(data); 
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🔑 Admin Login</h2>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <input 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Username" 
            required 
          />
          <input 
            value={password}
            style={{backgroundColor:'black'}}
            onChange={(e) => setPassword(e.target.value)} 
            type="password" 
            placeholder="Password" 
            required 
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
