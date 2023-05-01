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
const verifyToken = require('./middleware/auth')
const path = require('path');
const verifyAdmin = require('./middleware/admin')
app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI).then(result => {
  console.log('connected to MongoDB')
})
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
insertSystemCategories()
app.use(express.static('public/build'));
// app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/artworks', artworkRouter)
app.use('/api/comments', commentRouter)
app.use('/api/relationships', relationshipRouter)
app.use('/api/categories', categoryRouter )
app.use('/api/verifyAdmin', verifyAdmin)
app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '/public/build')});
});
const server = app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
module.exports = { app, server }