// Import mongoose and get the Schema object
const mongoose = require('mongoose')
const { Schema } = mongoose;
// Define the comment schema using the Schema object
const commentSchema = new mongoose.Schema({
  artWork_id: { type: Schema.Types.ObjectId, ref: 'ArtWork'},
  user_id: { type: Schema.Types.ObjectId, ref: 'User'},
  text: String,
  createdAt:String,
})
// Create a new model for comments using the schema and export it
const artWork = mongoose.model('Comment', commentSchema)
module.exports = artWork