const mongoose = require('mongoose')
const { Schema } = mongoose;
const relationship = new mongoose.Schema({
    follower_id: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    followee_id: [{ type: Schema.Types.ObjectId, ref: 'User'}]
})
const Relationship = mongoose.model('Relationship', relationship)
module.exports = Relationship