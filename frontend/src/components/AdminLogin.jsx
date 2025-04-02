// src/components/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(credentials.username, credentials.password);
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Login</h1>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;