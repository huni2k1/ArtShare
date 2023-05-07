// Import Mongoose library
const mongoose = require('mongoose');
// Define Category schema using Mongoose schema constructor
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});
// Create and export Category model using Category schema
module.exports = mongoose.model('Category', categorySchema);
