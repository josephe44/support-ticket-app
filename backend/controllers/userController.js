const asyncHander = require('express-async-handler')

// @desc Register a new user
// @route /api/users
// @acess Public
const registerUser = asyncHander(async (req, res) => {
  // Destructing the request body
  const { name, email, password } = req.body

  // Validation
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please enter all fields')
  }

  res.send('Register Route')
})

// @desc login a user
// @route /api/users/login
// @acess Public
const loginUser = asyncHander(async (req, res) => {
  res.send('Login Route')
})

module.exports = {
  registerUser,
  loginUser,
}
