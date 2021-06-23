/**
 * @author Jacob Yousif
 * A controller for the home page.
 */

'use strict'

const homeController = {}

/**
 * This method it responds to the GET request when
 * the user view the snippets.
 * It renders the home page.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
homeController.index = (req, res) => {
  res.render('home')
}

module.exports = homeController
