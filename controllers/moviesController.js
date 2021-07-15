/**
 * @author Jacob Yousif
 * A controller for the movies page.
 */
const db = require('../database')
require('dotenv').config()
const auth = require('../validators/authenticator')
const controller = {}

/**
 * This method responds to the GET request when
 * the user wants to view the movies.
 * It renders the movies page.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
controller.get = async (req, res) => {
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT * FROM movies ORDER BY name', (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('main/movies', { rows, title: 'Movies', url: '/find-movie' })
          } else {
            res.render('anonymous/movies', { rows, title: 'Movies', url: '/find-movie' })
          }
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}
module.exports = controller
