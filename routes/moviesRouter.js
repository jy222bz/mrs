/**
 * @author Jacob Yousif
 * A router for the create form.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/moviesController')

/**
 * The routes for the create form.
 */
router.get('/movies', controller.get)

module.exports = router
