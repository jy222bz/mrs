/**
 * @author Jacob Yousif
 * A controller for the create form.
 */
const database = require('../database')
const mysql = require('mysql2')
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
       * DB connection.
       */
      const db = mysql.createPool({
        connectionLimit: 100,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      })

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
        connection.query('SELECT * FROM movies_table', (err, rows) => {
          connection.release()
          if (!err) {
            res.render('add/add-to-bestbox', { rows, message: message, title: 'Add Review' })
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
  const { name, rating, budget, gross, awards, reviews } = req.body
  const values = name.split('|')
  if (auth.checkAuthenticated(req)) {
    try {
      /**
       * DB connection.
       */
      const db = mysql.createPool({
        connectionLimit: 100,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      })

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
        connection.query('INSERT INTO box_office_table SET name = ?, rating = ?, budget = ?, gross = ?, awards = ?, reviews = ?, movieID = ?', [values[0], rating, budget, gross, awards, reviews, values[1]], (err, rows) => {
          connection.release()
          if (!err) {
            req.flash('message', 'It was successfully added!')
            res.redirect('/best-box/add-to-bestbox')
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
