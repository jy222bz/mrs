/**
 * @author Jacob Yousif
 * A controller for the searchform.
 */
const db = require('../database')
require('dotenv').config()
const auth = require('../validators/authenticator')
const searchController = {}


/**
 * This method it responds to the GET request when
 * the user wans to search for a specific tag.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
searchController.get = async (req, res) => {
  searchController.aggregateCheapest(req, res)
}

/**
 * This method it responds to the GET request when
 * the user wans to search for a specific tag.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
searchController.getMutual = async (req, res) => {
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
        } else {
          console.log('MySQL is connected. Connection ID: ' + connection.threadId)
        }
        connection.query('SELECT DISTINCT d.fullName, d.age, d.origin, m.name AS name1, s.name AS name2 FROM directors_table d, movies_table m, series_table s WHERE d.fullName = m.director AND d.fullName = s.director', (err, rows) => {
          connection.release()
          if (!err) {
            res.render('search/search', { mutual: rows })
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
 * the user wans to search for a specific tag.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
searchController.crossJoins = async (req, res) => {
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
        connection.query('SELECT m.name AS name1, s.name AS name2, m.price AS price1, s.price AS price2, (m.price + s.price) AS total FROM movies_table m CROSS JOIN series_table s', (err, rows) => {
          connection.release()
          if (!err) {
            res.render('search/search', { joins: rows, title: 'Search' })
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
 * the user wans to search for a specific tag.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
searchController.innerJoins = async (req, res) => {
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
        } else {
          console.log('MySQL is connected. Connection ID: ' + connection.threadId)
        }
        connection.query('SELECT m.name, m.director, m.category, b.rating FROM movies m INNER JOIN reviews b ON m.name = b.name', (err, rows) => {
          connection.release()
          if (!err) {
            console.log(rows)
            res.render('search/search', { innerJoins: rows })
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
 * the user wans to search for a specific tag.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
searchController.innerJoins = async (req, res) => {
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
        } else {
          console.log('MySQL is connected. Connection ID: ' + connection.threadId)
        }
        connection.query('SELECT m.name, m.director, m.category, b.rating, b.gross, b.grossWorldwide FROM movies_table m INNER JOIN box_office_table b ON m.name = b.name', (err, rows) => {
          connection.release()
          if (!err) {
            console.log(rows)
            res.render('search/search', { innerJoins: rows })
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
 * the user wans to search for a specific tag.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
searchController.aggregateExpensive = async (req, res) => {
  if (auth.checkAuthenticated(req)) {
    try {
      db.getConnection((error, connection) => {
        if (error) {
          console.log(error)
          process.exit(1)
        }
        connection.query('SELECT * MAX(m.price) AS mPrice, m.name AS mName, s.name AS sName, MAX(s.price) AS sPrice FROM movies_table m, series_table s ORDER BY m.name', (err, rows) => {
          connection.release()
          if (!err) {
            res.render('search/search', { expensive: rows })
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
 * the user wans to search for a specific tag.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
searchController.aggregateCheapest = async (req, res) => {

    try {
      db.getConnection((error, connection) => {
        if (error) {
          console.log(error)
          process.exit(1)
        }
        connection.query('SELECT r.movieID, r.rating AS rate FROM reviews r WHERE r.rating = (SELECT MAX(rating) FROM reviews)', (err, rows) => {
          connection.release()
          if (!err) {
            console.log(rows)
          }
        })
      })
    } catch (error) {
      console.log(error)
    }
}

module.exports = searchController
