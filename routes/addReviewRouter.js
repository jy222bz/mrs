/**
 * @author Jacob Yousif
 * A router for the add review form.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/addReviewController')

/**
 * The routes for the add review form.
 */
router
  .get('/reviews/add-review', controller.get)
  .post('/reviews/add-review', controller.post)

module.exports = router
