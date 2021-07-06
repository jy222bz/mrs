/**
 * @author Jacob Yousif
 * A router for the search bar.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/funFactsController')

/**
 * The route for the search bar.
 */
router
  .get('/fun-facts', controller.get)

module.exports = router
