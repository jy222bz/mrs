/**
 * @author Jacob Yousif
 * A controller for the add review form.
 */
const db = require('../database')
require('dotenv').config()
const auth = require('../validators/authenticator')
const moment = require('moment')
const addController = {}

/**
 * This method responds to the GET request when
 * the user wants the add review form
 * It renders the add review form.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 * @returns {object} the Express redirection.
 */
addController.get = async (req, res) => {
  if (auth.checkAuthenticated(req)) {
    try {
      const message = req.flash('message')
      delete req.session.message
      const rows = []
      db.getConnection((error, connection) => {
        if (error) {
          process.exit(1)
        }
        render(connection, res, rows, message)
      })
    } catch (error) {
      console.log(error)
    }
  } else {
    return res.redirect('/login')
  }
}

/**
 * It selects movies and shows and renders the add review form.
 *
 * @param {object} connection the MySQL connection.
 * @param {object} res the Express response.
 * @param {object[]} rows the data.
 * @param {string} message the flash message.
 */
function render (connection, res, rows, message) {
  connection.query('SELECT * FROM movies ORDER BY name', (err, row1) => {
    connection.release()
    if (!err) {
      populate(row1, rows)
      connection.query('SELECT * FROM serieses ORDER BY name', (e, row2) => {
        connection.release()
        if (!e) {
          populate(row2, rows)
          res.render('add/add-review', { rows: rows, message: message, title: 'Add Review', url: '/find-review' })
        }
      })
    }
  })
}

/**
 * It populates the array that holds the final objects.
 *
 * @param {object[]} items the data to collect.
 * @param {object[]} target the collection.
 */
function populate (items, target) {
  items.forEach(element => {
    target.push({ id: element.id, name: element.name, directorID: element.directorID })
  })
}

/**
 * This method responds to the Post request when
 * the user wants to add a review.
 * It saves the review in the database.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 * @returns {object} the Express redirection.
 */
addController.post = async (req, res) => {
  const { name, rating, gross, goofs, story, quotes, awards, review } = req.body
  const values = name.split('|')
  if (auth.checkAuthenticated(req)) {
    try {
      db.getConnection((error, connection) => {
        if (error) {
          console.log(error)
          process.exit(1)
        }
        const date = moment(new Date()).format('dddd, MMMM Do YYYY, h:mm:ss a')
        connection.query('INSERT INTO reviews SET movieName = ?, rating = ?, gross = ?, goofs = ?, story = ?, quotes = ?, awards = ?, review = ?, movieID = ?, author = ?, authorID = ?, createdAT = ?, updatedAT = ?, directorID = ?', [values[0], rating, gross, goofs, story, quotes, awards, review, values[1], req.session.author, req.session.userID, date, date, values[2]], (err, rows) => {
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
