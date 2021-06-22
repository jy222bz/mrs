/**
 * @author Jacob Yousif
 * A router for the search bar.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/searchController')

/**
 * The route for the search bar.
 */
router
  .get('/search', controller.get)

module.exports = router
