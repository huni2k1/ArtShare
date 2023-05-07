// Import required modules
const bcrypt = require('bcrypt')
const artWork = require('../models/artwork')
const usersRouter = require('express').Router()
const User = require('../models/user')
const mongoose = require('mongoose');

// Route to get all users
usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({});
    response.status(200).json(users);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});
// Route to get a user by their ID
usersRouter.get('/:id', async (request, response) => {
  const userId = request.params.id
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid user ID')
    }
    const user = await User.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }
    response.json(user)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})
// Route to get a user's ID by their name
usersRouter.get('/getID/:userName', async (request, response) => {
   const userName = request.params.userName
  User.find({ name: userName }).then(users => {
    response.json(users[0])
  })
})
// Route to create a new user
usersRouter.post('/', async (request, response) => {
  const { email, name, password } = request.body
  const findUser = await User.find({ email: email })
  if (findUser.length > 0) {
    return response.status(403).json({
      error: 'email already exists'
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    email,
    name,
    passwordHash,
  })
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})
// Route to get the posts liked by a user
usersRouter.post('/postLiked', async (request, response) => {
  const { userID } = request.body
  await User.find({ _id: userID }).then(user => {
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    else {
      artWork.find({
        _id: { $in: user[0].postLiked }
      }).then(posts => {
        response.status(201).json(posts)
      }).catch(error => {
        console.log(error)
      })
    }
  })
})
// Route to deactivate a user
usersRouter.put('/:id/deactivate', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.active = false;

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Route to activate a user
usersRouter.put('/:id/activate', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.active = true;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = usersRouter