/**
 * @author Jacob Yousif
 * A controller for the add movie form.
 */
const db = require('../database')
require('dotenv').config()
const auth = require('../validators/authenticator')
const addController = {}

/**
 * This method responds to the GET request when
 * the user wants to get the add form.
 * It renders the add movie form.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 * @returns {object} Express - the redirection.
 */
addController.get = async (req, res) => {
  if (auth.checkAuthenticated(req)) {
    try {
      const message = req.flash('message')
      delete req.session.message
      db.getConnection((error, connection) => {
        if (error) {
          console.log(error)
          process.exit(1)
        }
        connection.query('SELECT * FROM directors ORDER BY firstName;', (err, rows) => {
          connection.release()
          if (!err) {
            res.render('add/add-movie', { rows, message: message, title: 'Add Movie' })
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
 * the user wants to add the movie to the database.
 * It adds the movie into the database.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 * @returns {object} the Express redirection.
 */
addController.post = async (req, res) => {
  const { director, category, name, year, ageLimit, price, note, length, origin, language } = req.body
  const values = director.split('|')
  if (auth.checkAuthenticated(req)) {
    try {
      db.getConnection((error, connection) => {
        if (error) {
          console.log(error)
          process.exit(1)
        } else {
          console.log('MySQL is connected. Connection ID: ' + connection.threadId)
        }
        connection.query('INSERT INTO movies SET name = ?, ageLimit = ?, category = ?, director = ?, note = ?, year = ?, length = ?, price = ?, origin = ?, language = ?, directorID = ?', [name.toUpperCase(), ageLimit, category, values[0], note, year, length, price, origin.toUpperCase(), language.toUpperCase(), values[1]], (err, rows) => {
          connection.release()
          if (!err) {
            req.flash('message', 'It was successfully added!')
            res.redirect('/movies/add-movie')
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

module.exports = addController
