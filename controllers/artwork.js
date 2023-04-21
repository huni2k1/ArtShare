const artWorkRouter = require('express').Router()
const ArtWork = require('../models/artwork')
const User = require('../models/user')

artWorkRouter.get('/', async (request, response) => {
    ArtWork.find({}).then(artWork => {
        response.status(200).json(artWork)
    })
})
artWorkRouter.get('/:id', async (request, response) => {
    const artWorkID = request.params.id
    ArtWork.find({_id:artWorkID}).then(artWork => {
        response.status(200).json(artWork)
    })
})
artWorkRouter.post('/', async (request, response) => {
    const { base64, description, likes, user,category } = request.body
    const artWork = new ArtWork({
        base64,
        description,
        likes,
        user,
        category
    })
    const savedArtWork = await artWork.save()

    response.status(201).json(savedArtWork)
})
artWorkRouter.post('/like', async (request, response) => {
    const { artWorkID, userID } = request.body
    const filter = { _id: artWorkID };
    const update = { $inc: { likes: 1 } };
    const options = { new: true };
    const updatedArtWork = await artWork.findOneAndUpdate(filter, update, options);
    User.findById(userID, (err, user) => {
        if (err) {
            console.error(err);
        } else {
            user.postLiked.push(artWorkID)
            user.save((err,updatedDocument)=>{
                if(err){
                    console.error(err);
                }
            })
        }
    })
    response.status(201).json(updatedArtWork)
})
artWorkRouter.post('/unlike', async (request, response) => {
    const { id } = request.body
    const filter = { _id: id };
    const update = { $inc: { likes: -1 } };
    const options = { new: true };
    const updatedArtWork = await artWork.findOneAndUpdate(filter, update, options);
    response.status(201).json(updatedArtWork)
})
module.exports = artWorkRouter 