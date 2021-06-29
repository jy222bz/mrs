/**
 * Home Router.
 *
 * @author Jacob Yousif
 * @version 1.0.0
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/signupController')
const csrf = require('csurf')
const proc = csrf()
router.use(proc)

/**
 * The routes for the home.
 */
router
  .get('/register', controller.get)
  .post('/register', controller.post)

module.exports = router
