/**
 * @author Jacob Yousif
 * A router for the create form.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/addSnippetController')

/**
 * The routes for the create form.
 */
router
  .get('/add-snippet', controller.get)
  .post('/add-snippet', controller.post)

module.exports = router
