/**
 * A sign-in Router.
 *
 * @author Jacob Yousif
 * @version 1.0.0
 */

const express = require('express')
const router = express.Router()
const controller = require('../controllers/signinController')

/**
 * The routes for the sign-in.
 */
router
  .get('/login', controller.get)
  .post('/login', controller.post)

module.exports = router
