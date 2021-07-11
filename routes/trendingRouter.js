/**
 * @author Jacob Yousif
 * A router for the trending page.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/trendingController')

/**
 * The routes for the trending page.
 */
router
  .get('/trending', controller.get)
  .get('/find/:id', controller.find)

module.exports = router
