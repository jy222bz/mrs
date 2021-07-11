/**
 * A update review Router.
 *
 * @author Jacob Yousif
 * @version 1.0.0
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/updateReviewController')

/**
 * The routes for update review form.
 */
router
  .get('/reviews/:id', controller.update)
  .post('/reviews/:id', controller.updateReview)
  .get('/delete-review/:id', controller.delete)

module.exports = router
