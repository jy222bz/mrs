/**
 * A signup Router.
 *
 * @author Jacob Yousif
 * @version 1.0.0
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/signupController')

/**
 * The routes for the signup.
 */
router
  .get('/register', controller.get)
  .post('/register', controller.post)

module.exports = router
