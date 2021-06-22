/**
 * @author Jacob Yousif
 * A router for the signin form.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/signinController')
const csrf = require('csurf')
const proc = csrf()
router.use(proc)

/**
 * The routes for the signin form.
 */
router
  .get('/sign-in', controller.get)
  .post('/sign-in', controller.post)

module.exports = router
