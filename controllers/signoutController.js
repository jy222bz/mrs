/**
 * @author Jacob Yousif
 * A controller for the home page.
 */
const mysql = require('mysql2')
require('dotenv').config()
const auth = require('../validators/authenticator')
const controller = {}
/**
 * This method it responds to the GET request when
 * the user view the snippets.
 * It renders the home page.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
controller.get = async (req, res) => {
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
        connection.query('SELECT d.fullName, d.age, d.origin, m.mName, s.name FROM directors_table d, movies_table m, series_table s WHERE d.fullName = m.director AND d.fullName = s.director', (err, rows) => {
          connection.release()
          if (!err) {
            console.log(rows)
          }
        })
        connection.query('SELECT * FROM box_office_table', (err, rows) => {
          connection.release()
          if (!err) {
            res.render('home', { rows, title: 'Signout' })
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
 * This method it responds to the GET request when
 * the user view the snippets.
 * It renders the home page.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
controller.post = async (req, res) => {
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
        connection.query('SELECT d.fullName, d.age, d.origin, m.mName, s.name FROM directors_table d, movies_table m, series_table s WHERE d.fullName = m.director AND d.fullName = s.director', (err, rows) => {
          connection.release()
          if (!err) {
            console.log(rows)
          }
        })
        connection.query('SELECT * FROM box_office_table', (err, rows) => {
          connection.release()
          if (!err) {
            res.render('home', { rows })
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
