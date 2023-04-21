const mongoose = require('mongoose')
const { Schema } = mongoose;
const artWorkSchema = new mongoose.Schema({
  base64: String,
  description: String,
  likes: Number,
  comments: Number,
  category:String,
  user: { type: Schema.Types.ObjectId, ref: 'User'},
})
const artWork = mongoose.model('ArtWork', artWorkSchema)
module.exports = artWork