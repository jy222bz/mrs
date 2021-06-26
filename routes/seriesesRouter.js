/**
 * @author Jacob Yousif
 * A router for the create form.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/seriesesController')

/**
 * The routes for the create form.
 */
router.get('/serieses', controller.get)

module.exports = router
