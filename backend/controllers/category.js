const categoryRouter = require('express').Router();
const Category = require('../models/category');

categoryRouter.get('/', async (request, response) => {
  try {
    const categories = await Category.find({});
    response.status(200).json(categories);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

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

module.exports = categoryRouter;
