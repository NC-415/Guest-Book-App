const Testimonial = require('../models/Testimonial');

// Create a new testimonial
exports.createTestimonial = async (req, res) => {
  const { name, content } = req.body;
  try {
    const testimonial = await Testimonial.create({ name, content });
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a testimonial by ID
exports.getTestimonialById = async (req, res) => {
  const { id } = req.params;
  try {
    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.status(200).json(testimonial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all testimonials
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll();
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a testimonial
exports.updateTestimonial = async (req, res) => {
  const { id } = req.params;
  const { name, content } = req.body;
  try {
    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    testimonial.name = name;
    testimonial.content = content;
    await testimonial.save();
    res.status(200).json(testimonial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a testimonial
exports.deleteTestimonial = async (req, res) => {
  const { id } = req.params;
  try {
    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    await testimonial.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};