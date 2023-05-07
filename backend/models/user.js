// This file defines the user schema and creates a Mongoose model for it.
// The user schema specifies the shape of the user documents in the database.
// It includes fields for the user's email, name, password hash, admin status, and liked posts.
// The schema also specifies a toJSON method to transform the user document to JSON format.
// The Mongoose model is created from the schema and exported for use in other parts of the application.
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