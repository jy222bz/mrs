/**
 * @author Jacob Yousif
 * A router for the add series form.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/addSeriesController')

/**
 * The routes for the add series form.
 */
router
  .get('/serieses/add-series', controller.get)
  .post('/serieses/add-series', controller.post)

module.exports = router
