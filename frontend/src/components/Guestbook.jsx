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
    <div className="relative min-h-screen">
      {/* Fixed background */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 z-0" 
        style={{
          backgroundImage: "url('https://img.freepik.com/free-photo/top-view-notepad-with-small-bow-red-pencil-blue-background-with-copy-space_140725-140307.jpg?t=st=1743554627~exp=1743558227~hmac=24458b5e45e393d7be8b3e7dbecfef1896d32b16cabd78e2bb275cb83ac244d6&w=1380')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
        
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
      
      {/* Scrollable content */}
      <div className="relative z-10 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Glass-morphism form card */}
          <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl mb-8 p-8 border border-white border-opacity-20">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold text-indigo-900">Sign our Guestbook</h2>
              <p className="text-indigo-700 mt-2">Share your thoughts and experiences with us</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-indigo-700 mb-1">Your Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white bg-opacity-90"
                  value={newEntry.name}
                  onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-indigo-700 mb-1">Your Message</label>
                <textarea
                  id="message"
                  placeholder="Share your experience..."
                  className="w-full p-3 border border-indigo-200 rounded-lg h-32 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white bg-opacity-90"
                  value={newEntry.message}
                  onChange={(e) => setNewEntry({ ...newEntry, message: e.target.value })}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md"
              >
                Sign Guestbook
                <svg 
                  className="w-5 h-5" 
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

          {/* Entries List with animation */}
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
      </div>

    </div>
  );
};

export default Guestbook;