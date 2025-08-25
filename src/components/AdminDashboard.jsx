// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import AdminLogin from './AdminLogin';

const AdminDashboard = ({ onLogin, isAuthenticated }) => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchUrls();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const auth = localStorage.getItem('auth');
      if (!auth) return;

      const res = await fetch('http://localhost:5000/api/admin', {
        headers: {
          'Authorization': `Basic ${auth}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUrls(data);
        setError('');
      } else {
        localStorage.removeItem('auth');
        setError('Authentication failed. Please login again.');
      }
    } catch (err) {
      setError('Failed to fetch URLs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={onLogin} />;
  }

  if (loading) {
    return (
      <div style={{ padding: '20px' }}>
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ marginBottom: '20px' }}>
        <h1>Admin Dashboard</h1>
        <p style={{ color: '#000' }}>Manage and monitor all shortened URLs</p>
      </div>

      {error && (
        <div style={{ 
          backgroundColor: '#000', 
          color: 'black', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      {urls.length > 0 ? (
        <div style={{ 
          backgroundColor: 'black', 
          borderRadius: '8px', 
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#000' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Short URL</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Original URL</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Visit Count</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Created At</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url) => (
                <tr key={url._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>
                    <a 
                      href={`/${url.shortCode}`} 
                      target="_blank" 
                      rel="noreferrer"
                      style={{ textDecoration: 'none', color: '#1976d2' }}
                    >
                      /{url.shortCode}
                    </a>
                  </td>
                  <td style={{ padding: '12px', maxWidth: '400px', wordBreak: 'break-word' }}>
                    {url.longUrl}
                  </td>
                  <td style={{ padding: '12px', color: url.visitCount > 0 ? '#2e7d32' : '#666' }}>
                    {url.visitCount}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {new Date(url.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ 
          marginTop: '40px', 
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#666' }}>No URLs have been shortened yet.</h3>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
