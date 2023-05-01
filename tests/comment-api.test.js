const mongoose = require('mongoose')
const supertest = require('supertest')
const ArtWork = require('../models/artwork')
const { app } = require('../index.js')
const { server } = require('../index.js')
const User = require('../models/user')
const Comment = require('../models/comment')
const api = supertest(app)
describe('When there is two artworks exist', () => {
    beforeEach(async () => {
        await ArtWork.deleteMany({})
        await User.deleteMany({})
        let newUser1 = new User({
            email: "vhn",
            name: "ninh",
            passwordHash: "123",
        })
        await newUser1.save()
        const user = await User.findOne({ email: "vhn" });
        let newArtWork1 = new ArtWork({
            base64: "vhn",
            description: "artwork1",
            likes: 100,
            user: user._id
        })
        await newArtWork1.save()
        const artwork = await ArtWork.findOne({ base64: "vhn" });
        let comment1 = new Comment({
            artWork_id: artwork._id,
            user_id: user._id,
            text: "Test comment",
            created_at: Date.now(),
        })
        await comment1.save()
    }, 100000)
    test('Get Comment api endpoint work', async () => {
        const artWork = await ArtWork.findOne({ base64: "vhn" });
        const response = await api.get('/api/comments/' + artWork._id)
        console.log(response.body)
        expect(response.body).toHaveLength(1)
    })
    test('Post Comment api endpoint work', async () => {
        const artWork = await ArtWork.findOne({ base64: "vhn" });
        const user = await User.findOne({ email: "vhn" });
        const newComment = {
            artWork_id: artWork._id,
            user_id: user._id,
            text: "Test comment",
            created_at: Date.now(),
        }
        await api.post('/api/comments').send(newComment).expect(201).expect('Content-Type', /application\/json/)
        const response = await api.get('/api/comments/'+artWork._id)
        expect(response.body).toHaveLength(2)
    })
})


afterAll(async () => {
    await ArtWork.deleteMany({})
    await User.deleteMany({})
    await Comment.deleteMany({})
    await mongoose.connection.close()
    server.close()
})