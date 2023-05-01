const artWorkRouter = require('express').Router()
const artWork = require('../models/artwork')
const ArtWork = require('../models/artwork')
const User = require('../models/user')

artWorkRouter.get('/', async (request, response) => {
    console.log("API CALLED")
    const queryParam = request.query.user;
    const query = queryParam ? { user: queryParam } : {};
    try {
        const artWorks = await ArtWork.find(query).populate('user', 'name');
        const artWorksWithUserName = artWorks.map(artWork => {
            return { ...artWork._doc, userName: artWork.user.name };
        });
        response.status(200).json(artWorksWithUserName);
    } catch (error) {
        response.status(500).json({ message: "Error fetching artworks" });
    }
});
artWorkRouter.get('/:id', async (request, response) => {
    const artWorkID = request.params.id
    ArtWork.find({ _id: artWorkID }).then(artWork => {
        response.status(200).json(artWork)
    })
})

artWorkRouter.post('/', async (request, response) => {
    const { description, likes, user, category } = request.body
    const artWork = new ArtWork({
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
    const updatedArtWork = await ArtWork.findOneAndUpdate(filter, update, options);
    User.findById(userID, (err, user) => {
        if (err) {
            console.error(err);
        } else {
            user.postLiked.push(artWorkID)
            user.save((err, updatedDocument) => {
                if (err) {
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
    const updatedArtWork = await ArtWork.findOneAndUpdate(filter, update, options);
    response.status(201).json(updatedArtWork)
})
module.exports = artWorkRouter 