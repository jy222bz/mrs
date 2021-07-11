/**
 * @author Jacob Yousif
 * A router for the extra information page.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/overviewController')

/**
 * The routes for the top-rated Non-English and English movies and serieses, reviewers, and skilled directors.
 */
router
  .get('/toprated-movies', controller.getTopRated)
  .get('/toprated-serieses', controller.getTopRatedSerieses)
  .get('/active-reviewers', controller.getReviewers)
  .get('/toprated-nonenglish-movies', controller.getTopNonEnglishRated)
  .get('/toprated-nonenglish-serieses', controller.getTopRatedNonEnglisSerieses)
  .get('/skilled-directors', controller.getDirectorsForMoviesAndSerieses)

module.exports = router
