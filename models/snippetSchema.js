/**
 * @author Jacob Yousif
 * A scema model for the Snippet.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sinppetSchema = new Schema({
  tag: {
    type: String,
    required: true,
    uppercase: true
  },
  title: {
    type: String,
    required: true,
    uppercase: true
  },
  author: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true
  },
  ownerID: {
    type: String,
    required: true
  }
}, { timestamps: true })

const SNIPPET = mongoose.model('SNIPPET', sinppetSchema)
module.exports = SNIPPET
