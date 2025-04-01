import React, { useState, useEffect } from 'react';
import { getAllTestimonials, deleteTestimonial } from './ApiFunctions'; // Import API functions

const AdminDashboard = () => {
  const [entries, setEntries] = useState([]);

  // Fetch testimonials from the backend when the component mounts
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await getAllTestimonials();
        setEntries(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchEntries();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteTestimonial(id); // Call the API to delete the testimonial
        setEntries(entries.filter((entry) => entry.id !== id)); // Remove the deleted entry from the state
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        alert('Failed to delete the entry. Please try again.');
      }
    }
  };

  return (
    <div 
      className="w-full h-screen bg-cover bg-center bg-fixed bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1623697899808-80f1a17372be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
    >
      <div className="bg-white bg-opacity-30 p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-screen overflow-y-auto my-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center sticky top-0 bg-white bg-opacity-90 py-2">Admin Dashboard</h1>
        <div className="space-y-4">
          {entries.map((entry) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
