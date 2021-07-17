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
            res.render('extra/top1', { top: rows, url: '/find-top-movie' })
          } else {
            res.render('extra/top2', { top: rows, url: '/find-top-movie' })
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
      connection.query('SELECT review.authorID, COUNT(*) AS count, review.author, user.email AS contact FROM reviews review INNER JOIN users user ON user.id = review.authorID GROUP BY review.author ORDER BY count DESC', (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('extra/reviewers1', { authors: rows, url: '/find-reviewer' })
          } else {
            res.render('extra/reviewers2', { authors: rows, url: '/find-reviewer' })
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
            res.render('extra/top-series1', { top: rows, url: '/find-top-series' })
          } else {
            res.render('extra/top-series2', { top: rows, url: '/find-top-series' })
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
      connection.query('SELECT director.fullName AS director, director.origin AS origin, movie.name AS movie, series.name AS series FROM directors director INNER JOIN movies movie ON movie.directorID = director.id INNER JOIN serieses series ON series.directorID = director.id ORDER BY director', (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('extra/skilled-directors1', { rows, url: '/find-uni-director' })
          } else {
            res.render('extra/skilled-directors2', { rows, url: '/find-uni-director' })
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
      connection.query('SELECT movie.name, movie.origin, movie.director, movie.category, movie.language, review.rating AS rate FROM movies movie INNER JOIN reviews review ON review.movieID = movie.id WHERE movie.id IN (SELECT movieID FROM reviews WHERE rating > 79) AND movie.language <> "English" ORDER BY rate DESC', (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('extra/top-nonenglish-movies1', { rows, url: '/find-top-nonenglish-movie' })
          } else {
            res.render('extra/top-nonenglish-movies2', { rows, url: '/find-top-nonenglish-movie' })
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
      connection.query('SELECT series.name, series.origin, series.director, series.language, series.category, review.rating AS rate FROM serieses series INNER JOIN reviews review ON review.movieID = series.id WHERE series.id IN (SELECT movieID FROM reviews WHERE rating > 79) AND series.language <> "English" ORDER BY rate DESC', (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('extra/top-nonenglish-series1', { rows, url: '/find-top-nonenglish-series' })
          } else {
            res.render('extra/top-nonenglish-series2', { rows, url: '/find-top-nonenglish-series' })
          }
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = searchController
