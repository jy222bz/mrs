/**
 * Home Router.
 *
 * @author Jacob Yousif
 * @version 1.0.0
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/signoutController')
/**
 * The routes for the home.
 */
router.get('/logout', controller.get)

module.exports = router
