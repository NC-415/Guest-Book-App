// src/components/AdminDashboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAxios, logout } from '../services/authService';

const AdminDashboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fix the React Hook dependency warning by using useCallback
  const handleLogout = useCallback(() => {
    logout();
    navigate('/admin/login');
  }, [navigate]);

  // Fetch testimonials from the backend when the component mounts
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        // Use authAxios which includes the Bearer token in the header
        const response = await authAxios.get('/testimonials');
        setEntries(response.data);
        setError('');
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        if (error.response && error.response.status === 401) {
          // Token expired or invalid, logout user
          handleLogout();
        } else {
          setError('Failed to load testimonials. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [handleLogout]); // Now handleLogout is included in the dependency array

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await authAxios.delete(`/testimonials/${id}`);
        setEntries(entries.filter((entry) => entry.id !== id));
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        if (error.response && error.response.status === 401) {
          handleLogout();
        } else {
          alert('Failed to delete the entry. Please try again.');
        }
      }
    }
  };

  return (
    <div 
      className="w-full min-h-screen bg-cover bg-center bg-fixed bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1623697899808-80f1a17372be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
    >
      <div className="bg-white bg-opacity-30 p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-screen overflow-y-auto my-8">
        <div className="flex justify-between items-center sticky top-0 bg-white bg-opacity-90 py-2 px-4 mb-6 rounded-md">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
          >
            Logout
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.length === 0 ? (
              <p className="text-center text-gray-700 p-6">No testimonials found.</p>
            ) : (
              entries.map((entry) => (
                <div key={entry.id} className="bg-white bg-opacity-90 rounded-lg shadow p-6 relative">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-gray-800">{entry.content}</h3>
                    <span className="text-sm text-gray-500">{entry.date}</span>
                  </div>
                  <p className="text-gray-700">{entry.message}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">{entry.name}</span>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;