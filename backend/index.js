// Import the Express library
const express = require('express')
const app = express()
// Import the User model
const User = require('./models/user')

// Import configuration variables
const config = require('./utils/config')

// Import mongoose for MongoDB connectivity
const mongoose = require('mongoose')

// Import routers for each endpoint
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const artworkRouter = require('./controllers/artwork')
const commentRouter = require('./controllers/comment')
const relationshipRouter = require('./controllers/relationship')
const categoryRouter = require('./controllers/category')

// Import CORS middleware for cross-origin resource sharing
const cors = require('cors')

// Import utility functions
const insertSystemCategories = require('./utils/insertSystemCategories')
const verifyToken = require('./middleware/auth')
const verifyAdmin = require('./middleware/admin')
const path = require('path');

// Set up middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
mongoose.set('strictQuery', false)

// Connect to MongoDB using the configured URI
mongoose.connect(config.MONGODB_URI).then(result => {
  console.log('connected to MongoDB')
})
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// Insert the system categories into the database
insertSystemCategories()

// Set up routes
app.use(express.static('public/build'));
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/artworks', artworkRouter)
app.use('/api/comments', commentRouter)
app.use('/api/relationships', relationshipRouter)
app.use('/api/categories', categoryRouter )
app.use('/api/verifyAdmin', verifyAdmin)

// Serve the index.html file for any other request
app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '/public/build')});
});


const server = app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
// Export the app and server objects for testing
module.exports = { app, server }