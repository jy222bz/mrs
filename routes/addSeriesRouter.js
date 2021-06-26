/**
 * @author Jacob Yousif
 * A router for the create form.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/addSeriesController')

/**
 * The routes for the create form.
 */
router
  .get('/serieses/add-series', controller.get)
  .post('/serieses/add-series', controller.post)

module.exports = router
