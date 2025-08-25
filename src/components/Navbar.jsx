import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🔗 URL Shortener</Link>
      </div>

      <div className="navbar-links">
        <Link to="/" className="nav-item">Home</Link>

        {isAuthenticated ? (
          <>
            <Link to="/admin" className="nav-item">Admin</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <Link to="/admin" className="nav-item">Admin Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
