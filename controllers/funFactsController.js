/**
 * @author Jacob Yousif
 * A controller for the searchform.
 */
const db = require('../database')
require('dotenv').config()
const auth = require('../validators/authenticator')
const searchController = {}

/**
 * This method it responds to the GET request when
 * the user wans to search for a specific tag.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
searchController.get = async (req, res) => {
  searchController.getTopPicturesView(req, res)
}

/**
 * This method it responds to the GET request when
 * the user wans to search for a specific tag.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
searchController.getTopPicturesView = async (req, res) => {
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT * FROM top_films_view', (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('extra/funfacts1', { top: rows })
          } else {
            res.render('extra/funfacts2', { top: rows })
          }
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = searchController
