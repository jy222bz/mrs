/**
 * @author Jacob Yousif
 * A controller for the home page.
 */

const mysql = require('mysql2')
require('dotenv').config()

const homeController = {}

/**
 * This method it responds to the GET request when
 * the user view the snippets.
 * It renders the home page.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
homeController.index = async (req, res) => {
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
      var directors, movies, series
      connection.query('SELECT * FROM directors_table', (err, rows) => {
        connection.release()
        if (!err) {
          directors = rows
        }
      })
      connection.query('SELECT * FROM movies_table', (err, rows) => {
        connection.release()
        if (!err) {
          movies = rows
        }
      })
      connection.query('SELECT * FROM series_table', (err, rows) => {
        connection.release()
        if (!err) {
          series = rows
          res.render('home', { directors, movies, series })
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = homeController
