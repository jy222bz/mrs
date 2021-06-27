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
      connection.query('SELECT m.name AS mName, MIN(m.price) AS mPrice, s.name AS sName, MIN(s.price) AS bPrice FROM movies_table m, series_table s ORDER BY m.name', (err, rows) => {
        connection.release()
        if (!err) {
          console.log(rows)
        }
      })
      connection.query('SELECT * FROM movies_table', (err, rows) => {
        connection.release()
        if (!err) {
          res.render('main/movies', { rows })
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}
module.exports = controller
