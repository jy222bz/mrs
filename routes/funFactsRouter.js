/**
 * @author Jacob Yousif
 * A router for the search bar.
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/funFactsController')

/**
 * The route for the search bar.
 */
router
  .get('/fun-facts', controller.get)
  .get('/mutual-directors', controller.getMutual)
  .get('/cross-join', controller.crossJoins)
  .get('/inner-join', controller.innerJoins)
  .get('/aggregate-cheapest', controller.aggregateCheapest)
  .get('/aggregate-expensive', controller.aggregateExpensive)

module.exports = router
