const relationshipRouter = require('express').Router()
const Relationship = require('../models/Relationship')

relationshipRouter.get('/', async (request, response) => {
    Relationship.find({}).then(relationships => {
        response.status(200).json(relationships)
    })
})
relationshipRouter.get('/:userID', async (request, response) => {
    const userID = request.params.userID
    let resData = { followee: [], follower: [] }
    Relationship.find({ followee_id: userID }).then(relationships => {
        resData.followee = relationships
    })
    Relationship.find({ follower_id: userID }).then(relationships => {
        resData.follower = relationships
    })
    response.status(200).json(resData)
})
relationshipRouter.post('/', async (request, response) => {
    const { followerID, followeeID } = request.body
    const findRelationship = await Relationship.find({
        follower_id: followerID,
        followee_id: followeeID
    })
    if (findRelationship.length > 0) {
        return response.status(403).json({
            error: 'Relationship already exists'
        })
    }
    const relationship = new Relationship({
        follower_id: followerID,
        followee_id: followeeID
    })
    const savedRelationship = await relationship.save()
    response.status(201).json(savedRelationship)

})

module.exports = relationshipRouter 