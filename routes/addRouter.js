/**
 * @author Jacob Yousif
 * A router for the create form.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/addController')

/**
 * The routes for the create form.
 */
router
  .get('/add-movie', controller.get)
  .post('/add-movie', controller.post)

module.exports = router
