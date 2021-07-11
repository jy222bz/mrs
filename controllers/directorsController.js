/**
 * @author Jacob Yousif
 * A controller for the director page.
 */
const db = require('../database')
require('dotenv').config()
const auth = require('../validators/authenticator')
const controller = {}

/**
 * This method responds to the GET request when
 * the user wants to view the directors.
 * It renders the directors page.
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
      connection.query('SELECT * FROM directors ORDER BY firstName', (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('main/directors', { rows, title: 'Directors' })
          } else {
            res.render('anonymous/directors', { rows, title: 'Directors' })
          }
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}
module.exports = controller
