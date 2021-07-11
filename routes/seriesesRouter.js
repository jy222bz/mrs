/**
 * @author Jacob Yousif
 * A router for the serieses page.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/seriesesController')

/**
 * The routes for the serieses page.
 */
router.get('/serieses', controller.get)

module.exports = router
