/**
 * @author Jacob Yousif
 * A controller for the update movie page.
 */
const db = require('../database')
require('dotenv').config()
const auth = require('../validators/authenticator')
const controller = {}

/**
 * This method responds to the GET request when
 * the user want to update.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 * @returns {object} the Express redirection.
 */
controller.update = async (req, res) => {
  if (auth.checkAuthenticated(req)) {
    try {
      db.getConnection((error, connection) => {
        if (error) {
          console.log(error)
          process.exit(1)
        }
        connection.query('SELECT * FROM movies WHERE id = ?', [req.params.id], (err, rows) => {
          connection.release()
          if (!err) {
            res.render('update/movies', { rows, title: 'Update Movie', url: '/find-movie' })
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
 * This method responds to the Postrequest when
 * the usersubmits the info for update.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 * @returns {object} the Express redirection.
 */
controller.updateMovie = async (req, res) => {
  const { name, category, year, ageLimit, price, note, length, origin, language } = req.body
  if (auth.checkAuthenticated(req)) {
    try {
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
 * This method responds to the DELETE request when
 * the user wans to delete a movie.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 * @returns {object} the Express redirection.
 */
controller.delete = async (req, res) => {
  if (auth.checkAuthenticated(req)) {
    try {
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
