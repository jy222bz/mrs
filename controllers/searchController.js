/**
 * @author Jacob Yousif
 * A controller for the searchform.
 */

const mysql = require('mysql2')
require('dotenv').config()
const searchController = {}

/**
 * This method it responds to the GET request when
 * the user wans to search for a specific tag.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
searchController.get = async (req, res) => {
  res.render('search/search')
}

/**
 * This method it responds to the GET request when
 * the user wans to search for a specific tag.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
searchController.getMutual = async (req, res) => {
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
      connection.query('SELECT DISTINCT d.fullName, d.age, d.origin, m.mName, s.name FROM directors_table d, movies_table m, series_table s WHERE d.fullName = m.director AND d.fullName = s.director', (err, rows) => {
        connection.release()
        if (!err) {
          res.render('search/search', { mutual: rows })
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 * This method it responds to the GET request when
 * the user wans to search for a specific tag.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
searchController.crossJoins = async (req, res) => {
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
      connection.query('SELECT m.mName, s.name, m.mPrice, s.price, (m.mPrice + s.price -100) AS total_after, (m.mPrice + s.price) AS total_before FROM movies_table m CROSS JOIN series_table s', (err, rows) => {
        connection.release()
        if (!err) {
          res.render('search/search', { joins: rows })
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = searchController
