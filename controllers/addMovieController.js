/**
 * @author Jacob Yousif
 * A controller for the create form.
 */

const mysql = require('mysql2')
require('dotenv').config()
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
      connection.query('SELECT * FROM directors_table', (err, rows) => {
        connection.release()
        if (!err) {
          res.render('add/add-movie', { rows, message: message })
        }
      })
    })
  } catch (error) {
    console.log(error)
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
  const { director, category, name, year, ageLimit, price, note, length, origin, language } = req.body
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
      connection.query('INSERT INTO movies_table SET name = ?, ageLimit = ?, category = ?, director = ?, note = ?, year = ?, length = ?, price = ?, origin = ?, language = ?', [name, ageLimit, category, director, note, year, length, price, origin, language], (err, rows) => {
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
}

module.exports = addController
