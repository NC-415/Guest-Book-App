const express = require('express');
const cors = require('cors');
const sequelize = require('./models'); // Import Sequelize instance
const User = require('./models/User'); // Import User model
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('API is running...'));

app.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.create({ name, email });
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({ error: error.message });
    }
});

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
