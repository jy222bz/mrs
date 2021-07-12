/**
 * @author Jacob Yousif
 * A router for the top directors page.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/topDirectorsController')

/**
 * The routes for the top directors.
 */
router
  .get('/top-directors', controller.get)

module.exports = router
