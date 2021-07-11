/**
 * @author Jacob Yousif
 * A controller for the update series page.
 */
const db = require('../database')
require('dotenv').config()
const auth = require('../validators/authenticator')
const controller = {}

/**
 * This method responds to the GET request when
 * the user wants to update a series.
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
        connection.query('SELECT * FROM serieses WHERE id = ?', [req.params.id], (err, rows) => {
          connection.release()
          if (!err) {
            res.render('update/serieses', { rows, title: 'Update Series' })
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
 * This method it responds to the POST request when
 * the user submits the info for update.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 * @returns {object} the Express redirection.
 */
controller.updateSeries = async (req, res) => {
  const { name, year, ageLimit, price, note, seasons, episodes, language, origin } = req.body
  if (auth.checkAuthenticated(req)) {
    try {
      db.getConnection((error, connection) => {
        if (error) {
          console.log(error)
          process.exit(1)
        }
        connection.query('UPDATE serieses s LEFT JOIN reviews r ON s.id = r.movieID SET s.name = ?, s.seasons = ?, s.episodes = ?, s.ageLimit = ?, s.year = ?, s.origin = ?, s.note = ?, s.language = ?, s.price = ?, r.movieName = ? WHERE s.id = ?', [name.toUpperCase(), seasons, episodes, ageLimit, year, origin.toUpperCase(), note, language.toUpperCase(), price, name, req.params.id], (err, rows) => {
          connection.release()
          if (!err) {
            res.redirect('/serieses')
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
 * the user wans to delete a series.
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
        connection.query('DELETE FROM serieses WHERE id = ?', [req.params.id], (err, rows) => {
          connection.release()
          if (!err) {
            res.redirect('/serieses')
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
