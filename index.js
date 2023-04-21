const express = require('express')
const app = express()
const User = require('./models/user')
const config = require('./utils/config')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const artworkRouter = require('./controllers/artwork')
const commentRouter = require('./controllers/comment')
const relationshipRouter = require('./controllers/relationship')
const cors = require('cors')
const insertSystemCategories = require('./utils/insertSystemCategories')
const categoryRouter = require('./controllers/category')
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
mongoose.set('strictQuery',false)
mongoose.connect(config.MONGODB_URI).then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/artworks', artworkRouter)
app.use('/api/comments', commentRouter)
app.use('/api/relationships', relationshipRouter)
app.use('/api/categories',categoryRouter)
insertSystemCategories()
const PORT = 3001
const server=app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
module.exports = {app,server}