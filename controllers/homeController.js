/**
 * @author Jacob Yousif
 * A controller for the home page.
 */
const db = require('../database')
require('dotenv').config()
const auth = require('../validators/authenticator')
const homeController = {}
/**
 * This method it responds to the GET request when
 * the user view the snippets.
 * It renders the home page.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
homeController.index = async (req, res) => {
  var isAuth = false
  const message = req.flash('message')
  delete req.session.message
  if (auth.checkAuthenticated(req)) {
    isAuth = true
  }
  try {
    /**
     * Exporting the DB connection.
     *
     * @param {object} req the Express request.
     * @param {object} res the Express response.
     */

    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT * FROM reviews Order By rating DESC', (err, rows) => {
        connection.release()
        if (!err) {
          if (isAuth) {
            res.render('home', { rows, title: 'Home', message: message })
          } else {
            res.render('main/home', { rows, title: 'Home' })
          }
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = homeController
