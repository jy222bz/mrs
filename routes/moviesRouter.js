/**
 * @author Jacob Yousif
 * A router for the movies page.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/moviesController')

/**
 * The routes for the movies page.
 */
router.get('/movies', controller.get)

module.exports = router
