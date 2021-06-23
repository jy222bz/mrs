/**
 * @author Jacob Yousif
 * A router for the create form.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/addController')


/**
 * The routes for the create form.
 */
router
  .get('/create-a-post', controller.get)
  .post('/create-a-post', controller.post)

module.exports = router
