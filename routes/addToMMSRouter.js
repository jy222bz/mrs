/**
 * @author Jacob Yousif
 * A router for the create form.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/addToMMSController')

/**
 * The routes for the create form.
 */
router
  .get('/add-to-bestbox', controller.get)
  .post('/add-to-bestbox', controller.post)

module.exports = router