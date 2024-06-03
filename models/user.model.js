const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const user = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  registrationDate: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

user.pre('save', function(next) {
  const user = this

  if(!user.isModified('password')) return next()

  bc
})

module.exports = mongoose.model("User", user)