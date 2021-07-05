/**
 * @author Jacob Yousif
 * A controller for the create form.
 */
const db = require('../database')
require('dotenv').config()
const auth = require('../validators/authenticator')
const controller = {}

/**
 * This method it responds to the GET request when
 * the user wants to create a snippet.
 * It renders the create form.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
controller.get = async (req, res) => {
  if (auth.checkAuthenticated(req)) {
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
        connection.query('SELECT * FROM serieses ORDER BY name', (err, rows) => {
          connection.release()
          if (!err) {
            res.render('main/serieses', { rows, title: 'Serieses' })
          }
        })
      })
    } catch (error) {
      console.log(error)
    }
  } else {
    return res.redirect('/login')
  }
}
module.exports = controller
