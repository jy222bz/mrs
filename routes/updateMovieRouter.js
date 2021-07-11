/**
 * A update movie Router.
 *
 * @author Jacob Yousif
 * @version 1.0.0
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/updateMovieController')

/**
 * The routes for the update movie form.
 */
router
  .get('/movies/:id', controller.update)
  .post('/movies/:id', controller.updateMovie)
  .get('/delete-movie/:id', controller.delete)

module.exports = router
