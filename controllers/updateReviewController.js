/**
 * @author Jacob Yousif
 * A controller for the home page.
 */
const db = require('../database')
require('dotenv').config()
const auth = require('../validators/authenticator')
const controller = {}
const moment = require('moment')

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
      db.getConnection((error, connection) => {
        if (error) {
          console.log(error)
          process.exit(1)
        }
        connection.query('SELECT * FROM reviews WHERE id = ?', [req.params.id], (err, rows) => {
          connection.release()
          if (!err) {
            if (req.session.userID !== rows[0].authorID) {
              req.flash('message', 'You are not the author of this review, therefore, you cannot edit it.')
              return res.redirect('/')
            } else {
              return res.render('update/reviews', { rows, title: 'Update Review' })
            }
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
controller.updateReview = async (req, res) => {
  const { rating, gross, goofs, story, quotes, awards, review } = req.body
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
        const date = moment(new Date()).format('dddd, MMMM Do YYYY, h:mm:ss a')
        connection.query('SELECT * FROM reviews WHERE id = ?', [req.params.id], (er, item) => {
          connection.release()
          if (!er) {
            if (req.session.userID !== item[0].authorID) {
              req.flash('message', 'You are not the author of this review, therefore, you cannot edit it.')
              return res.redirect('/')
            } else {
              connection.query('UPDATE reviews r SET r.rating = ?, r.gross = ?, r.goofs = ?, r.story = ?, r.quotes = ?, r.awards = ?, r.review = ?, r.updatedAT = ? WHERE id = ?', [rating, gross, goofs, story, quotes, awards, review, date, req.params.id], (err, rows) => {
                connection.release()
                if (!err) {
                  res.redirect('/reviews')
                }
              })
            }
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
        connection.query('SELECT * FROM reviews WHERE id = ?', [req.params.id], (er, item) => {
          connection.release()
          if (!er) {
            if (req.session.userID !== item[0].authorID) {
              req.flash('message', 'You are not the author of this review, therefore, you cannot delete it.')
              return res.redirect('/')
            } else {
              connection.query('DELETE FROM reviews WHERE id = ?', [req.params.id], (err, rows) => {
                connection.release()
                if (!err) {
                  res.redirect('/reviews')
                }
              })
            }
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
