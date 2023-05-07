/**
 * Defines the schema for the ArtWork model.
 * 
 * The ArtWork model represents an artwork created by a user. It includes
 * the artwork's description, number of likes, number of comments, category,
 * user who created the artwork, and an "active" flag indicating whether
 * the artwork is currently active or has been deleted.
 */
const mongoose = require('mongoose')
const { Schema } = mongoose;
const artWorkSchema = new mongoose.Schema({
  description: String,
  likes: Number,
  comments: Number,
  category:String,
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  active:{
    type:Boolean,
    default: true
  }
})
const artWork = mongoose.model('ArtWork', artWorkSchema)
module.exports = artWork