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