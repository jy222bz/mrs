/**
 * A Home Router.
 *
 * @author Jacob Yousif
 * @version 1.0.0
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/homeController')

/**
 * The routes for the home.
 */
router
  .get('', controller.index)
  .get('/', controller.index)
  .get('/reviews/read/:id', controller.read)
  .get('/reviews', controller.index)
  .post('/', controller.find)

module.exports = router
