/**
 * @author Jacob Yousif
 * A router for the create form.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/trendingController')

/**
 * The routes for the create form.
 */
router
  .get('/trending', controller.get)
  .get('/find/:id', controller.find)

module.exports = router
