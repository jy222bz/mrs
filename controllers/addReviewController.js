/**
 * @author Jacob Yousif
 * A controller for the create form.
 */
const db = require('../database')
require('dotenv').config()
const auth = require('../validators/authenticator')
const addController = {}
/**
 * This method it responds to the GET request when
 * the user wants to create a snippet.
 * It renders the create form.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
addController.get = async (req, res) => {
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
          process.exit(1)
        }
        connection.query('SELECT * FROM movies', (err, rows) => {
          connection.release()
          if (!err) {
            res.render('add/add-review', { rows, message: message, title: 'Add Review' })
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
addController.post = async (req, res) => {
  const { name, rating, gross, goofs, story, quotes, awards, review } = req.body
  const values = name.split('|')
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
        connection.query('INSERT INTO reviews SET movieName = ?, rating = ?, gross = ?, goofs = ?, story = ?, quotes = ?, awards = ?, review = ?, movieID = ?, author = ?, authorID = ?', [values[0], rating, gross, goofs, story, quotes, awards, review, values[1], req.session.author, req.session.userID], (err, rows) => {
          connection.release()
          if (!err) {
            req.flash('message', 'It was successfully added!')
            res.redirect('/reviews/add-review')
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
