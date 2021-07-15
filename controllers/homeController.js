/**
 * @author Jacob Yousif
 * A controller for the home page.
 */
const db = require('../database')
require('dotenv').config()
const auth = require('../validators/authenticator')
const homeController = {}

/**
 * This method responds to the GET request when
 * the user wants the home page.
 * It renders the home page.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
homeController.index = async (req, res) => {
  var isAuth = false
  const message = req.flash('message')
  delete req.session.message
  if (auth.checkAuthenticated(req)) {
    isAuth = true
  }
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT * FROM reviews Order By rating DESC', (err, rows) => {
        connection.release()
        if (!err) {
          if (isAuth) {
            res.render('home', { rows, title: 'Home', message: message, url: '/find-review' })
          } else {
            res.render('main/home', { rows, title: 'Home', message: message, url: '/find-review' })
          }
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 * This method responds to the GET request when
 * the user wants to search for a specific review or reviewer.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
homeController.find = async (req, res) => {
  var isAuth = false
  const message = req.flash('message')
  delete req.session.message
  if (auth.checkAuthenticated(req)) {
    isAuth = true
  }
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT * FROM reviews WHERE movieName LIKE ? OR author LIKE ? ORDER BY rating DESC', ['%' + req.body.search + '%', '%' + req.body.search + '%'], (err, rows) => {
        connection.release()
        if (!err) {
          if (isAuth) {
            res.render('home', { rows, title: 'Home', message: message })
          } else {
            res.render('main/home', { rows, title: 'Home', message: message })
          }
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 * It renders the page for a review, to view a single review.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
homeController.read = async (req, res) => {
  var isAuth = false
  delete req.session.message
  if (auth.checkAuthenticated(req)) {
    isAuth = true
  }
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT * FROM reviews WHERE id = ?', [req.params.id], (err, rows) => {
        connection.release()
        if (!err) {
          if (isAuth) {
            res.render('review/review1', { rows, title: 'Home' })
          } else {
            res.render('review/review2', { rows, title: 'Home' })
          }
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = homeController
