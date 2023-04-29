const mongoose = require('mongoose')
const { Schema } = mongoose;
const commentSchema = new mongoose.Schema({
  artWork_id: { type: Schema.Types.ObjectId, ref: 'ArtWork'},
  user_id: { type: Schema.Types.ObjectId, ref: 'User'},
  text: String,
  createdAt:String,
})
const artWork = mongoose.model('Comment', commentSchema)
module.exports = artWork