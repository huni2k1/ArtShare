// Import the Mongoose library
const mongoose = require('mongoose')
const { Schema } = mongoose;
// Define a schema for representing relationships between users
const relationship = new mongoose.Schema({
    follower_id: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    followee_id: [{ type: Schema.Types.ObjectId, ref: 'User'}]
})
const Relationship = mongoose.model('Relationship', relationship)
// Export the model for use in other modules
module.exports = Relationship