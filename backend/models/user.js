const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  passwordHash: String,
  admin:Boolean,
  postLiked: [{ type: Schema.Types.ObjectId, ref: 'ArtWork'}],
  active:{
    type:Boolean,
    default: true
  }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User