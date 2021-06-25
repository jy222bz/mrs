/**
 * @author Jacob Yousif
 * A controller for the create form.
 */

const mysql = require('mysql2')
require('dotenv').config()
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
          res.render('add/add-series', { rows, message: message })
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
controller.post = async (req, res) => {
  const { director, category, name, year, rating, price, note, seasons, episodes } = req.body
  var directorId
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
      if (director === 'Unregistered') {
        directorId = -1
      } else {
        connection.query('SELECT * FROM directors_table WHERE fullName LIKE ?', ['%' + director + '%'], (err, rows) => {
          connection.release()
          if (!err) {
            rows.forEach(element => {
              directorId = element.directorID
              console.log(element)
            })
          }
        })
      }
      connection.query('INSERT INTO series_table SET name = ?, seasons = ?, episodes = ?, director = ?, directorId = ?, year = ?,  rating = ?, note = ?, category = ?,  price = ?', [name, seasons, episodes, director, directorId, year, rating, note, category, price], (err, rows) => {
        connection.release()
        if (!err) {
          req.flash('message', 'It was successfully added!')
          res.redirect('/add-series')
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = controller
