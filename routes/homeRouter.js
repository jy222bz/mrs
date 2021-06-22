/**
 * Home Router.
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
  .get('/', controller.index)
  .get('/snippets', controller.index)
  .get('/snippets/:id', controller.indexGetSnippet)
  .delete('/snippets/:id', controller.indexDeleteSnippet)

module.exports = router
