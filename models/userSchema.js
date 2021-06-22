/**
 * @author Jacob Yousif
 * A scema model for the User.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

const USER = mongoose.model('USER', userSchema)
module.exports = USER
