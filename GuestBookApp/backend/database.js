const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

// Create a new Sequelize instance
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: true // Set to true if you have a CA certificate.
            }
        },
        logging: console.log, // Enable query logging for debugging
    }
);

// Test database connection
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Database connection error:', err));

module.exports = sequelize;

