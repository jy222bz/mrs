/**
 * @author Jacob Yousif
 * A router for the signup form.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/signupController')
const csrf = require('csurf')
const proc = csrf()
router.use(proc)

/**
 * The routes for the signup form.
 */
router
  .get('/sign-up', controller.get)
  .post('/sign-up', controller.post)

module.exports = router
