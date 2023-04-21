const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const {app} = require('../index.js')
const {server} = require('../index.js')
const api = supertest(app)
describe('when there is initially 2 users saved', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        let newUser1 = new User({
            email: "vhn",
            name: "ninh",
            passwordHash: "123",
        })
        let newUser2 = new User({
            email: "vhk",
            name: "khang",
            passwordHash: "123",
        })
        await newUser1.save()
        await newUser2.save()
    })
    test('GET Users api work', async () => {
        await api.get('/api/users').expect(200)
        const response =await api.get('/api/users')
        expect(response.body).toHaveLength(2)

    })
    test('POST Users api work', async () => {
        const newUser = {
            email: 'vinh',
            name: 'VTruong',
            password: '123',
        }
        await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)
        const response= await api.get('/api/users')
        expect(response.body).toHaveLength(3)
    })
    test('POST Users api failed when adding duplicate user', async () => {
        const newUser = {
            email: "vhk",
            name: "khang",
            password: "123",
        }
        const response = await api.post('/api/users').send(newUser)
        expect(response.body.error).toBe('email already exists')
        expect(response.status).toBe(403)
    })
    test('All 2 users returned', async () => {
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(2)
    }, 100000)
    test('First user have correct data', async () => {
        const response = await api.get('/api/users')
        expect(response.body[0].email).toContain("vhn")
        expect(response.body[0].name).toContain("ninh")
    })
})
afterAll(async () => {
    await User.deleteMany({})
    await mongoose.connection.close()
    await server.close()
})
