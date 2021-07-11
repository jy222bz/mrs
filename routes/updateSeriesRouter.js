/**
 * A update series Router.
 *
 * @author Jacob Yousif
 * @version 1.0.0
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/updateSeriesController')

/**
 * The routes for the update series form.
 */
router
  .get('/serieses/:id', controller.update)
  .post('/serieses/:id', controller.updateSeries)
  .get('/delete-series/:id', controller.delete)

module.exports = router
