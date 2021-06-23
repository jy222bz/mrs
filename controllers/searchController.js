/**
 * @author Jacob Yousif
 * A controller for the searchform.
 */

'use strict'
const searchController = {}

/**
 * This method it responds to the GET request when
 * the user wans to search for a specific tag.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
searchController.get = async (req, res) => {
  res.render('search/search')
}

/**
 * This method it responds to the GET request when
 * the user wans to search for a specific tag.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
searchController.post = async (req, res) => {
  res.render('search/search')
}

module.exports = searchController
