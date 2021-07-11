/**
 * @author Jacob Yousif
 * A controller for the add series form.
 */
const db = require('../database')
require('dotenv').config()
const auth = require('../validators/authenticator')
const controller = {}

/**
 * This method responds to the GET request when
 * the user wants to add a series.
 * It renders the add series form.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 * @returns {object} the Express redirection.
 */
controller.get = async (req, res) => {
  if (auth.checkAuthenticated(req)) {
    try {
      const message = req.flash('message')
      delete req.session.message
      db.getConnection((error, connection) => {
        if (error) {
          console.log(error)
          process.exit(1)
        }
        connection.query('SELECT * FROM directors ORDER BY firstName', (err, rows) => {
          connection.release()
          if (!err) {
            res.render('add/add-series', { rows, message: message, title: 'Add Series' })
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
 * This method responds to the Post request when
 * the user wants to add the series to the database.
 * It saves the series in the database.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 * @returns {object} the Express redirection.
 */
controller.post = async (req, res) => {
  const { director, category, name, year, ageLimit, price, note, seasons, episodes, language, origin } = req.body
  const values = director.split('|')
  if (auth.checkAuthenticated(req)) {
    try {
      db.getConnection((error, connection) => {
        if (error) {
          console.log(error)
          process.exit(1)
        }
        connection.query('INSERT INTO serieses SET name = ?, seasons = ?, episodes = ?, director = ?, ageLimit = ?, year = ?,  origin = ?, note = ?, category = ?, language = ?,  price = ?, directorID = ?', [name.toUpperCase(), seasons, episodes, values[0], ageLimit, year, origin.toUpperCase(), note, category, language.toUpperCase(), price, values[1]], (err, rows) => {
          connection.release()
          if (!err) {
            req.flash('message', 'It was successfully added!')
            res.redirect('/serieses/add-series')
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
