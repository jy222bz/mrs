/**
 * @author Jacob Yousif
 * A router for the directors page.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/directorsController')

/**
 * The routes for the directors page.
 */
router.get('/directors', controller.get)

module.exports = router
