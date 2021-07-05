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
          console.log(error)
          process.exit(1)
        }
        connection.query('SELECT * FROM movies WHERE id = ?', [req.params.id], (err, rows) => {
          connection.release()
          if (!err) {
            res.render('update/movies', { rows, title: 'Update Movie' })
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
controller.updateMovie = async (req, res) => {
  const { name, category, year, ageLimit, price, note, length, origin, language } = req.body
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
        connection.query('UPDATE movies m LEFT JOIN reviews r ON m.id = r.movieID SET m.name = ?, m.ageLimit = ?, m.category = ?, m.note = ?, m.year = ?, m.length = ?, m.price = ?, m.origin = ?, m.language = ?, r.movieName = ? WHERE m.id = ?', [name, ageLimit, category, note, year, length, price, origin.toUpperCase(), language.toUpperCase(), name, req.params.id], (err, rows) => {
          connection.release()
          if (!err) {
            res.redirect('/movies')
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
          console.log(error)
          process.exit(1)
        }
        connection.query('DELETE FROM movies WHERE id = ?', [req.params.id], (err, rows) => {
          connection.release()
          if (!err) {
            res.redirect('/movies')
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
