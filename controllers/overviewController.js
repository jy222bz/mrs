/**
 * @author Jacob Yousif
 * A controller for the extra infomation.
 */
const db = require('../database')
require('dotenv').config()
const auth = require('../validators/authenticator')
const searchController = {}

/**
 * This method responds to the GET request when
 * the user wans to view the top tated movies.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
searchController.getTopRated = async (req, res) => {
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT * FROM top_films_view', (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('extra/top1', { top: rows })
          } else {
            res.render('extra/top2', { top: rows })
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
 * the user wans to view the reviewers and their contact information.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
searchController.getReviewers = async (req, res) => {
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT r.authorID, COUNT(*) AS count, r.author, a.email AS contact FROM reviews r INNER JOIN users a ON a.id = r.authorID GROUP BY r.author ORDER BY count DESC', (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('extra/reviewers1', { authors: rows })
          } else {
            res.render('extra/reviewers2', { authors: rows })
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
 * the user wans to view the top rated serieses.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
searchController.getTopRatedSerieses = async (req, res) => {
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT * FROM top_films_view', (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('extra/top-series1', { top: rows })
          } else {
            res.render('extra/top-series2', { top: rows })
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
 * the user wans to view the skilled directors.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
searchController.getDirectorsForMoviesAndSerieses = async (req, res) => {
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT d.fullName AS director, d.origin AS origin, m.name AS movie, s.name AS series FROM directors d INNER JOIN movies m ON m.directorID = d.id INNER JOIN serieses s ON s.directorID = d.id ORDER BY director', (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('extra/skilled-directors1', { rows })
          } else {
            res.render('extra/skilled-directors2', { rows })
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
 * the user wans to view the top rated Non-English movies.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
searchController.getTopNonEnglishRated = async (req, res) => {
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT m.name, m.origin, m.director, m.category, m.language, r.rating AS rate FROM movies m INNER JOIN reviews r ON r.movieID = m.id WHERE m.id IN (SELECT movieID FROM reviews WHERE rating > 79) AND m.origin <> "UK" AND m.origin <> "USA" ORDER BY rate DESC', (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('extra/top-nonenglish-movies1', { rows })
          } else {
            res.render('extra/top-nonenglish-movies2', { rows })
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
 * the user wans to view the top rated Non-English serieses.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
searchController.getTopRatedNonEnglisSerieses = async (req, res) => {
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT m.name, m.origin, m.director, m.language, m.category, r.rating AS rate FROM serieses m INNER JOIN reviews r ON r.movieID = m.id WHERE m.id IN (SELECT movieID FROM reviews WHERE rating > 79) AND m.origin <> "UK" AND m.origin <> "USA" ORDER BY rate DESC', (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('extra/top-nonenglish-series1', { rows })
          } else {
            res.render('extra/top-nonenglish-series2', { rows })
          }
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = searchController
