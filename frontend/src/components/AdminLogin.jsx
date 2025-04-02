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
    <div className="min-h-screen">
      <div
        className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 z-0 flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/abstract-secure-technology-background_23-2148357087.jpg?t=st=1743559741~exp=1743563341~hmac=30edadd9dc60921f2f83c13c7d380204223b1ce3fe2012cdd5423c1702514cd1&w=1380')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
        <form
          onSubmit={handleLogin}
          className="relative bg-white bg-opacity-20 p-6 rounded-lg shadow-lg space-y-4 w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold text-center text-blue-300 mb-4">
            Login to Admin Dashboard
          </h2>
          <div>
            <label htmlFor="username" className="block text-green-300 mb-2">
              Username
            </label>
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
            <label htmlFor="password" className="block text-green-300 mb-2">
              Password
            </label>
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