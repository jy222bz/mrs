/**
 * @author Jacob Yousif
 * A controller for the searchform.
 */

'use strict'
const Snippet = require('../models/snippetSchema')
const searchController = {}

/**
 * This method it responds to the GET request when
 * the user wans to search for a specific tag.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
searchController.get = async (req, res) => {
  const { term } = req.query
  const termInUpperCase = term.toUpperCase()
  Snippet.find({ tag: termInUpperCase }, function (err, result) {
    if (err) {
      console.log(err)
    } else {
      if (typeof req.session !== 'undefined' && req.session.isAuth) {
        res.render('search/search', { result })
      } else {
        res.render('search/search2', { result })
      }
    }
  }).catch((error) => {
    console.log(error)
  })
}

module.exports = searchController
