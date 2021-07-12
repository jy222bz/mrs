/**
 * @author Jacob Yousif
 * A controller for the top directors page.
 */
const db = require('../database')
require('dotenv').config()
const auth = require('../validators/authenticator')
const controller = {}

/**
 * This method responds to the GET request when
 * the user wants to view the top directors page.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 * @returns {object} res the Express redirection.
 */
controller.get = async (req, res) => {
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT director.fullName, director.origin, director.age FROM directors director INNER JOIN reviews review ON review.directorID = director.id WHERE director.id NOT IN (SELECT directorID FROM reviews WHERE rating < 75) ORDER BY fullName', (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('extra/top-directors1', { rows })
          } else {
            res.render('extra/top-directors2', { rows })
          }
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = controller
