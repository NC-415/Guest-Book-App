const express = require('express');
const testimonialController = require('../controllers/testimonialController');

const router = express.Router();

// Create a new testimonial
router.post('/', testimonialController.createTestimonial);

// Get a testimonial by ID
router.get('/:id', testimonialController.getTestimonialById);

// Get all testimonials
router.get('/', testimonialController.getAllTestimonials);

// Update a testimonial
router.put('/:id', testimonialController.updateTestimonial);

// Delete a testimonial
router.delete('/:id', testimonialController.deleteTestimonial);

module.exports = router;