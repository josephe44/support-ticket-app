const asyncHander = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

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

  // Find if user already exits
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  // Return the user
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new error('Invalid credentials')
  }
})

// @desc login a user
// @route /api/users/login
// @acess Public
const loginUser = asyncHander(async (req, res) => {
  // Destructing the request body
  const { email, password } = req.body

  // search for user with email
  const user = await User.findOne({ email })

  // Check if user and password match
  if (user && (await bcrypt.compare(password, user.password))) {
    // Return user
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

// @desc Get current user
// @route /api/users/me
// @acess Private
const getMe = asyncHander(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name
  }
  res.status(200).json(user)
})

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}
