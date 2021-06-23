/**
 * @author Jacob Yousif
 * A router for the create form.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/addAuthorController')

/**
 * The routes for the create form.
 */
router
  .get('/add-author', controller.get)
  .post('/add-author', controller.post)

module.exports = router
