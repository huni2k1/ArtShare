const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const {app} = require('../index.js')
const {server} = require('../index.js')

const api = supertest(app)
describe('when there is initially 2 users saved', () => {
    const saltRounds = 10
    beforeEach(async () => {
        await User.deleteMany({})
        let newUser1 = new User({
            email: "vhn",
            name: "ninh",
            passwordHash: await bcrypt.hash("123", saltRounds)
        })
        let newUser2 = new User({
            email: "vhk",
            name: "khang",
            passwordHash: await bcrypt.hash("123", saltRounds)
        })
        await newUser1.save()
        await newUser2.save()
    },10000)
    test('POST Login api work', async () => {
        const loginInfor = {
            email: 'vhn',
            password: '123',
        }
        await api.post('/api/login').send(loginInfor).expect(200).expect('Content-Type', /application\/json/)
    })
    test('POST Login api work and reject with a fail password', async () => {
        const loginInfor = {
            email: 'vhn',
            password: '1234',
        }
        const response = await api.post('/api/login').send(loginInfor)
        expect(response.body.error).toBe('invalid username or password')
        expect(response.status).toBe(401)
    })
})


afterAll(async () => {
    await User.deleteMany({})
    await mongoose.connection.close()
    server.close()
})