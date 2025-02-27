const express = require('express');
const cors = require('cors');
const sequelize = require('./database'); // Import Sequelize instance

const testimonialRoutes = require('./routes/testimonialRoute'); // Import User model

require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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