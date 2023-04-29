const mongoose = require('mongoose')
const supertest = require('supertest')
const ArtWork = require('../models/artwork')
const bcrypt = require('bcrypt')
const { app } = require('../index.js')
const { server } = require('../index.js')
const User = require('../models/user')

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
        const user = await User.findOne({email:"vhn"});
        let newArtWork1 = new ArtWork({
            base64: "vhn",
            description: "artwork1",
            likes: 100,
            user:user._id
        })
        let newArtWork2 = new ArtWork({
            base64: "vhk",
            description: "artwork2",
            likes: 100,
            user:user._id,
        })
        await newArtWork1.save()
        await newArtWork2.save()
    },100000)
    test('Get Artwork api work', async () => {
        const response= await api.get('/api/artworks')
        expect(response.body).toHaveLength(2)
    })
    test('Post Artwork api work', async () => {
        const newArtWork= {
            base:"newArtWork",
            description: "New one",
            likes:0,
            user: await User.findOne({email:"vhn"})._id
        }
        await api.post('/api/artworks').send(newArtWork).expect(201).expect('Content-Type', /application\/json/)
        const response= await api.get('/api/artworks')
        expect(response.body).toHaveLength(3)
    })
})


afterAll(async () => {
    await ArtWork.deleteMany({})
    await User.deleteMany({})
    await mongoose.connection.close()
    server.close()
})