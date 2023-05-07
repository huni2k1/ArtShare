const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (request, response) => {
  const { email, password } = request.body
  const user = await User.findOne({ email })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
  if(!user.active){
    return response.status(401).json({
      error: 'user banned'
    })
  }
  const payload={
    id:user._id,
    username: user.name
  }
  const token = jwt.sign(payload, '123', { expiresIn: '1h' });
  response.status(200)
    .send({ email: user.email, name: user.name, id: user._id,token:token })
})
module.exports = loginRouter