/**
 * @author Jacob Yousif
 * A router for the create form.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/addDirectorController')

/**
 * The routes for the create form.
 */
router
  .get('/directors/add-director', controller.get)
  .post('/directors/add-director', controller.post)

module.exports = router
