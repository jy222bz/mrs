/**
 * @author Jacob Yousif
 * A controller for the serieses page.
 */
const db = require('../database')
require('dotenv').config()
const auth = require('../validators/authenticator')
const controller = {}

/**
 * This method responds to the GET request when
 * the user view the srieses.
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
      connection.query('SELECT * FROM serieses ORDER BY name', (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('main/serieses', { rows, title: 'Serieses', url: '/find-series' })
          } else {
            res.render('anonymous/serieses', { rows, title: 'Serieses', url: '/find-series' })
          }
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}
module.exports = controller
