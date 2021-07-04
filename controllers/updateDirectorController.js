/**
 * @author Jacob Yousif
 * A controller for the home page.
 */
const db = require('../database')
require('dotenv').config()
const auth = require('../validators/authenticator')
const controller = {}

/**
 * This method it responds to the GET request when
 * the user wants to view a snippet.
 * It renders the snippet page.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
controller.update = async (req, res) => {
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
          process.exit(1)
        }
        connection.query('SELECT * FROM directors WHERE id = ?', [req.params.id], (err, rows) => {
          connection.release()
          if (!err) {
            res.render('update/directors', { rows, title: 'Update Director' })
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

/**
 * This method it responds to the DELETE request when
 * the user wans to delete a snippet.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
controller.updateDirector = async (req, res) => {
  const { firstName, lastName, age, origin, id } = req.body
  const fullName = firstName + ' ' + lastName
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
          process.exit(1)
        }
        connection.query('UPDATE directors SET firstName = ?, lastName = ?, fullName = ?, origin = ?, age = ? WHERE id = ?', [firstName, lastName, fullName, origin, age, id], (err, row) => {
          connection.release()
          if (!err) {
            connection.query('UPDATE movies m INNER JOIN directors d ON m.directorID = d.id SET m.director = d.fullName', (er, rows) => {
              connection.release()
              if (!er) {
                res.redirect('/directors')
              }
            })
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

/**
 * This method it responds to the DELETE request when
 * the user wans to delete a snippet.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
controller.delete = async (req, res) => {
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
          process.exit(1)
        }
        connection.query('DELETE FROM directors WHERE id = ?', [req.params.id], (err, rows) => {
          connection.release()
          if (!err) {
            res.redirect('/directors')
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
