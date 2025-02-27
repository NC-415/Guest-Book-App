const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import Sequelize instance

// Define the Testimonial model
const Testimonial = sequelize.define('Testimonial', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Testimonial;