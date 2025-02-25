import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Guestbook from './components/Guestbook';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Guestbook />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;