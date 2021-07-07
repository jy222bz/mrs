/**
 * @author Jacob Yousif
 * A controller for the searchform.
 */
const db = require('../database')
require('dotenv').config()
const auth = require('../validators/authenticator')
const searchController = {}
var top
var directors
var authors
var topNonEnglishMovie
var topNonEnglishSeries

/**
 * This method it responds to the GET request when
 * the user wans to search for a specific tag.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
searchController.get = async (req, res) => {
  searchController.getTopPicturesView(req, res)
}

/**
 * This method it responds to the GET request when
 * the user wans to search for a specific tag.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
searchController.getTopPicturesView = async (req, res) => {
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT * FROM top_films_view', (err, rows) => {
        connection.release()
        if (!err) {
          top = rows
          searchController.getDirectorsForMoviesAndSerieses(req, res)
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
          directors = rows
          searchController.getAuthors(req, res)
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
searchController.getTopNonEnglish = async (req, res) => {
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT m.name, m.origin, m.director, m.category, m.language, r.rating AS rate FROM movies m INNER JOIN reviews r ON r.movieID = m.id WHERE m.id IN (SELECT movieID FROM reviews WHERE rating > 79) AND m.origin <> "UK" AND m.origin <> "USA" ORDER BY rate DESC', (err, rows) => {
        connection.release()
        if (!err) {
          topNonEnglishMovie = rows
          searchController.getTopNonEnglishSeries(req, res)
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
searchController.getTopNonEnglishSeries = async (req, res) => {
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT m.name, m.origin, m.director, m.language, m.category, r.rating AS rate FROM serieses m INNER JOIN reviews r ON r.movieID = m.id WHERE m.id IN (SELECT movieID FROM reviews WHERE rating > 79) AND m.origin <> "UK" AND m.origin <> "USA" ORDER BY rate DESC', (err, rows) => {
        connection.release()
        if (!err) {
          topNonEnglishSeries = rows
          if (auth.checkAuthenticated(req)) {
            res.render('extra/overview1', { top: top, both: directors, authors: authors, nonEnglishMovie: topNonEnglishMovie, nonEnglishSeries: topNonEnglishSeries })
          } else {
            res.render('extra/overview2', { top: top, both: directors, authors: authors, nonEnglishMovie: topNonEnglishMovie, nonEnglishSeries: topNonEnglishSeries })
          }
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
searchController.getAuthors = async (req, res) => {
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT r.authorID, COUNT(*) AS count, r.author, a.email AS contact FROM reviews r INNER JOIN users a ON a.id = r.authorID GROUP BY r.author ORDER BY count DESC', (err, rows) => {
        connection.release()
        if (!err) {
          authors = rows
          searchController.getTopNonEnglish(req, res)
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = searchController
