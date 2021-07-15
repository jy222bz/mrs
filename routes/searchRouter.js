/**
 * A Search Router.
 *
 * @author Jacob Yousif
 * @version 1.0.0
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/searchController')

/**
 * The routes for the search.
 */
router

  .post('/find-review', controller.findReview)
  .post('/find-director', controller.findDirector)
  .post('/find-movie', controller.findMovie)
  .post('/find-series', controller.findSeries)
  .post('/find-top-movie', controller.findTopMovie)
  .post('/find-top-series', controller.findTopSeries)
  .post('/find-top-nonenglish-movie', controller.findTopNonenglishMovie)
  .post('/find-top-nonenglish-series', controller.findTopNonenglishSeries)
  .post('/find-uni-director', controller.findUniDirector)
  .post('/find-top-director', controller.findTopDirector)
  .post('/find-trending', controller.findTrending)
  .post('/find-reviewer', controller.findReviewer)

module.exports = router
