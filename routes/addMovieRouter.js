/**
 * @author Jacob Yousif
 * A router for the create form.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/addMovieController')

/**
 * The routes for the create form.
 */
router
  .get('/movies/add-movie', controller.get)
  .post('/movies/add-movie', controller.post)

module.exports = router
