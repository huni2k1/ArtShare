
const commentRouter = require('express').Router()
const Comment = require('../models/comment')
const artWork = require('../models/artwork')

commentRouter.get('/:artWorkID', async (request, response) => {
  const artWorkID = request.params.artWorkID
  Comment.find({ artWork_id: artWorkID }).then(comments => {
    response.status(200).json(comments)
  }).catch((err) => {
    console.log("err")
  })
})
commentRouter.post('/', async (request, response) => {
  const { artWork_id, user_id, text, createdAt } = request.body
  const comment = new Comment({
    artWork_id,
    user_id,
    text,
    createdAt
  })
  const savedComment = await comment.save()
  const filter = { _id: artWork_id };
  const update = { $inc: { comments: 1 } };
  const options = { new: true };
  const updatedArtWork = await artWork.findOneAndUpdate(filter, update, options);
  response.status(201).json(savedComment)
})


module.exports = commentRouter