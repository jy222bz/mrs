/**
 * @author Jacob Yousif
 * A router for the search bar.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/overviewController')

/**
 * The route for the search bar.
 */
router
  .get('/toprated-movies', controller.getTopRated)
  .get('/toprated-serieses', controller.getTopRatedSerieses)
  .get('/active-reviewers', controller.getReviewers)
  .get('/toprated-nonenglish-movies', controller.getTopNonEnglishRated)
  .get('/toprated-nonenglish-serieses', controller.getTopRatedNonEnglisSerieses)
  .get('/skilled-directors', controller.getDirectorsForMoviesAndSerieses)

module.exports = router
