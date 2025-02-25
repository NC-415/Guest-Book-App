import React, { useState, useEffect } from 'react';
import { createTestimonial, getAllTestimonials } from './ApiFunctions'; // Import API functions

const Guestbook = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ name: '', message: '' });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, message } = newEntry;

    if (name.trim() && message.trim()) {
        const testimonialData = {
            name,
            content: message,  // Changed "message" to "content" to match the backend
        };

        console.log('Sending testimonial data:', testimonialData);

        try {
            const createdEntry = await createTestimonial(testimonialData);

            setEntries([createdEntry, ...entries]); // Add the new entry to the list
            setNewEntry({ name: '', message: '' }); // Reset the form
        } catch (error) {
            console.error('Error adding testimonial:', error);
            if (error.response) {
                if (error.response.data && error.response.data.message) {
                    alert(`Error: ${error.response.data.message}`);
                } else {
                    alert(`Error: ${error.response.status} - ${error.response.statusText}`);
                }
            } else {
                alert('There was an error adding your testimonial. Please try again later.');
            }
        }
    } else {
        alert('Please fill in both the name and message fields.');
    }
};

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-lg mb-6 p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Sign our Guestbook</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={newEntry.name}
              onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Leave a message..."
              className="w-full p-2 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={newEntry.message}
              onChange={(e) => setNewEntry({ ...newEntry, message: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Sign Guestbook
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
              />
            </svg>
          </button>
        </form>
      </div>

{/* Entries List */}
<div className="space-y-4">
  {entries.map(entry => (
    <div key={entry.id} className="bg-white rounded-lg shadow p-6 relative">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg text-gray-800">{entry.content}</h3>
        <span className="text-sm text-gray-500 absolute top-2 right-2">{entry.date}</span>
      </div>
      <p className="text-gray-700">{entry.message}</p>
      <span className="text-sm text-gray-500 absolute bottom-2 right-2">{entry.name}</span>
    </div>
  ))}
</div>
    </div>
  );
};

export default Guestbook;