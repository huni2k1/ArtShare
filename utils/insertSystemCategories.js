const Category = require('../models/category');
const categories = require('../data/categories')
const insertSystemCategories = ()=>{
Category.find({}).then((result) => {
    if (result.length === 0) {
      Category.create(categories.map((category) => ({ name: category.name })))
      .then(() => {
        console.log('Categories created');
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
    }
  })}
  module.exports= insertSystemCategories