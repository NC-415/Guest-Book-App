const express = require('express');
const cors = require('cors');
const sequelize = require('./database'); // Import Sequelize instance

const testimonialRoutes = require('./routes/testimonialRoute'); // Import testimonial routes
const jwt = require('jsonwebtoken'); // Add JWT for token generation


require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Hardcoded admin credentials (for simplicity; use a database in production)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123';
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'; // Use .env for security

// Authentication route
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Generate a JWT token
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
});


// Routes
app.get('/', (req, res) => res.send('API is running...'));
app.use('/testimonials', testimonialRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

sequelize.sync()

  .then(() => {
    console.log('Database synced...');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

