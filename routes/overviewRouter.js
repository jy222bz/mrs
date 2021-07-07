/**
 * @author Jacob Yousif
 * A router for the search bar.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/overviewController')

/**
 * The route for the search bar.
 */
router
  .get('/overview', controller.get)

module.exports = router
