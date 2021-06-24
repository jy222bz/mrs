/**
 * @author Jacob Yousif
 * A router for the create form.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/addUserController')

/**
 * The routes for the create form.
 */
router
  .get('/add-user', controller.get)
  .post('/add-user', controller.post)

module.exports = router
