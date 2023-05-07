// Import required modules and models
const categoryRouter = require('express').Router();
const Category = require('../models/category');

// Handle GET requests to retrieve all categories
categoryRouter.get('/', async (request, response) => {
  try {
    const categories = await Category.find({});
    response.status(200).json(categories);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle POST requests to create a new category
categoryRouter.post('/', async (request, response) => {
  try {
    const { name } = request.body;
    const category = new Category({ name });
    const savedCategory = await category.save();
    response.status(201).json(savedCategory);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


// Export the router to be used in other parts of the application\
module.exports = categoryRouter;
