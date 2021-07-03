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
      const message = req.flash('message')
      delete req.session.message
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
        } else {
          console.log('MySQL is connected. Connection ID: ' + connection.threadId)
        }
        connection.query('SELECT * FROM directors_table', (err, rows) => {
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
 * This method it responds to the Post request when
 * the user wants to create a snippet.
 * It create a snippet and saves in the DB.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
controller.post = async (req, res) => {
  const { director, category, name, year, ageLimit, price, note, seasons, episodes, language, origin } = req.body
  const values = director.split('|')
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
        } else {
          console.log('MySQL is connected. Connection ID: ' + connection.threadId)
        }
        connection.query('INSERT INTO series_table SET name = ?, seasons = ?, episodes = ?, director = ?, ageLimit = ?, year = ?,  origin = ?, note = ?, category = ?, language = ?,  price = ?, directorID = ?', [name, seasons, episodes, values[0], ageLimit, year, origin, note, category, language, price, values[1]], (err, rows) => {
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
