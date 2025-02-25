


const BASE_URL = 'http://localhost:5000/testimonials';

export const createTestimonial = async (testimonial) => {
    try {
        const response = await fetch(`${BASE_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testimonial),
        });
        if (!response.ok) {
            throw new Error('Failed to create testimonial');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating testimonial:', error);
        throw error;
    }
};

export const getTestimonialById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('Failed to get testimonial');
        }
        return await response.json();
    } catch (error) {
        console.error('Error getting testimonial by ID:', error);
        throw error;
    }
};

export const getAllTestimonials = async () => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('Failed to get testimonials');
        }
        return await response.json();
    } catch (error) {
        console.error('Error getting all testimonials:', error);
        throw error;
    }
};

export const updateTestimonial = async (id, updatedTestimonial) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTestimonial),
        });
        if (!response.ok) {
            throw new Error('Failed to update testimonial');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating testimonial:', error);
        throw error;
    }
};

export const deleteTestimonial = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete testimonial');
        }
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        throw error;
    }
};