// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UrlForm from './components/UrlForm';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const auth = localStorage.getItem('auth');
    if (auth) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<UrlForm />} />
            <Route 
              path="/admin" 
              element={
                <AdminDashboard 
                  onLogin={handleLogin}
                  isAuthenticated={isAuthenticated}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
