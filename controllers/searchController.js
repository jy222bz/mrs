/**
 * @author Jacob Yousif
 * A controller for the search page.
 */
const db = require('../database')
require('dotenv').config()
const auth = require('../validators/authenticator')
const controller = {}
const fetch = require('node-fetch')
const cheerio = require('cheerio')

/**
 * It finds the target review and renders it.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
controller.findReview = async (req, res) => {
  const message = req.flash('message')
  delete req.session.message
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT * FROM reviews WHERE movieName LIKE ? OR author LIKE ? ORDER BY rating DESC', ['%' + req.body.search + '%', '%' + req.body.search + '%'], (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('home', { rows, title: 'Home', message: message, url: '/find-review' })
          } else {
            res.render('main/home', { rows, title: 'Home', message: message, url: '/find-review' })
          }
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 * It finds the target director and renders it.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
controller.findDirector = async (req, res) => {
  const message = req.flash('message')
  delete req.session.message
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT * FROM directors WHERE firstName LIKE ? OR lastName LIKE ?', ['%' + req.body.search + '%', '%' + req.body.search + '%'], (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('main/directors', { rows, title: 'Directors', message: message, url: '/find-director' })
          } else {
            res.render('anonymous/directors', { rows, title: 'Directors', message: message, url: '/find-director' })
          }
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 * It finds the target movie and renders it.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
controller.findMovie = async (req, res) => {
  const message = req.flash('message')
  delete req.session.message
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT * FROM movies WHERE name LIKE ? OR director LIKE ?', ['%' + req.body.search + '%', '%' + req.body.search + '%'], (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('main/movies', { rows, title: 'Movies', message: message, url: '/find-movie' })
          } else {
            res.render('anonymous/movies', { rows, title: 'Movies', message: message, url: '/find-movie' })
          }
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 * It finds the target series and renders it.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
controller.findSeries = async (req, res) => {
  const message = req.flash('message')
  delete req.session.message
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT * FROM serieses WHERE name LIKE ? OR director LIKE ?', ['%' + req.body.search + '%', '%' + req.body.search + '%'], (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('main/serieses', { rows, title: 'Serieses', message: message, url: '/find-series' })
          } else {
            res.render('anonymous/serieses', { rows, title: 'Serieses', message: message, url: '/find-series' })
          }
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 * It finds the target top movie and renders it.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
controller.findTopMovie = async (req, res) => {
  const message = req.flash('message')
  delete req.session.message
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT review.id AS id, review.rating AS rate, movie.name AS movie, movie.category AS mcategory, movie.price AS mprice, movie.director AS mdirector FROM reviews review LEFT JOIN movies movie ON movie.id = review.movieID WHERE (review.rating > 79) AND movie.name LIKE ?', ['%' + req.body.search + '%'], (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('extra/top1', { top: rows, title: 'Top Movie', message: message, url: '/find-top-movie' })
          } else {
            res.render('extra/top2', { top: rows, title: 'Top Movie', message: message, url: '/find-top-movie' })
          }
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 * It finds the target top series and renders it.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
controller.findTopSeries = async (req, res) => {
  const message = req.flash('message')
  delete req.session.message
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT review.id AS id, review.rating AS rate, series.name AS series, series.category AS scategory, series.price AS sprice, series.director AS sdirector FROM reviews review LEFT JOIN serieses series ON series.id = review.movieID WHERE (review.rating > 79) AND series.name LIKE ?', ['%' + req.body.search + '%', '%' + req.body.search + '%'], (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('extra/top-series1', { top: rows, title: 'Top Series', message: message, url: '/find-top-series' })
          } else {
            res.render('extra/top-series2', { top: rows, title: 'Top Series', message: message, url: '/find-top-series' })
          }
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 * It finds the target non-english movie and renders it.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
controller.findTopNonenglishMovie = async (req, res) => {
  const message = req.flash('message')
  delete req.session.message
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT movie.name AS name, movie.origin, movie.director, movie.category, movie.language, review.rating AS rate FROM movies movie INNER JOIN reviews review ON review.movieID = movie.id WHERE movie.id IN (SELECT movieID FROM reviews WHERE rating > 79) AND movie.language <> "English" AND name LIKE ? ORDER BY rate DESC', ['%' + req.body.search + '%'], (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('extra/top-nonenglish-movies1', { rows, title: 'Top Non-English Movies', message: message, url: '/find-top-nonenglish-movie' })
          } else {
            res.render('extra/top-nonenglish-movies2', { rows, title: 'Top Non-English Movies', message: message, url: '/find-top-nonenglish-movie' })
          }
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 * It finds the target non-english series and renders it.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
controller.findTopNonenglishSeries = async (req, res) => {
  const message = req.flash('message')
  delete req.session.message
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT series.name AS name, series.origin, series.director, series.language, series.category, review.rating AS rate FROM serieses series INNER JOIN reviews review ON review.movieID = series.id WHERE series.id IN (SELECT movieID FROM reviews WHERE rating > 79) AND series.language <> "English" AND name LIKE ? ORDER BY rate DESC', ['%' + req.body.search + '%'], (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('extra/top-nonenglish-series1', { rows, title: 'Top Non-English Series', message: message, url: '/find-top-nonenglish-series' })
          } else {
            res.render('extra/top-nonenglish-series2', { rows, title: 'Top Non-English Series', message: message, url: '/find-top-nonenglish-series' })
          }
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 * It finds the target uni-director and renders it.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
controller.findUniDirector = async (req, res) => {
  const message = req.flash('message')
  delete req.session.message
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT director.fullName AS director, director.origin AS origin, movie.name AS movie, series.name AS series FROM directors director INNER JOIN movies movie ON movie.directorID = director.id INNER JOIN serieses series ON series.directorID = director.id WHERE director.firstName LIKE ? OR director.lastName LIKE ? ORDER BY director', ['%' + req.body.search + '%', '%' + req.body.search + '%'], (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('extra/skilled-directors1', { rows, title: 'Uni-Director', message: message, url: '/find-uni-director' })
          } else {
            res.render('extra/skilled-directors2', { rows, title: 'Uni-Director', message: message, url: '/find-uni-director' })
          }
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 * It finds the target top director and renders it.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
controller.findTopDirector = async (req, res) => {
  const message = req.flash('message')
  delete req.session.message
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT director.fullName, director.origin, director.age FROM directors director INNER JOIN reviews review ON review.directorID = director.id WHERE director.id NOT IN (SELECT directorID FROM reviews WHERE rating < 75) AND director.fullName LIKE ? ORDER BY fullName', ['%' + req.body.search + '%'], (err, rows) => {
        connection.release()
        if (!err) {
          if (auth.checkAuthenticated(req)) {
            res.render('extra/top-directors1', { rows, title: 'Top Director', message: message, url: '/find-top-director' })
          } else {
            res.render('extra/top-directors2', { rows, title: 'Top Director', message: message, url: '/find-top-director' })
          }
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 * It finds the target review movie and renders it.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
controller.findReviewer = async (req, res) => {
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT review.authorID, COUNT(*) AS count, review.author AS author, user.email AS contact FROM reviews review INNER JOIN users user ON user.id = review.authorID WHERE author LIKE ? GROUP BY review.author ORDER BY count DESC', ['%' + req.body.search + '%'], (err, rows) => {
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
 * It finds the target trending picture movie and renders it.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
controller.findTrending = async (req, res) => {
  try {
    const popularMoviesUrl = 'https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm'
    const popularShowsUrl = 'https://www.imdb.com/chart/tvmeter/?ref_=nv_tvv_mptv'
    var movies = await fetch(`${popularMoviesUrl}`)
      .then(response => response.text())
      .then(body => {
        var collected = []
        const $ = cheerio.load(body)
        $('#main > div > span > div > div > div.lister > table > tbody > tr').each((index, element) => {
          const $element = $(element)
          const $title = $element.find('td.titleColumn')
          const $rate = $element.find('td.ratingColumn.imdbRating')
          const result = $title.text().split('(')
          const title = result[0].trim()
          const rate = $rate.text().trim()
          if (rate.length && rate.length > 0 && Number(rate) > 5.9 && req.body.search.toLowerCase() === title.toLowerCase()) {
            collected.push({ rate: Number(rate), id: title, type: 'Movie' })
          }
        })
        return collected
      }).then(collected => {
        return collected
      })
    var serieses = await fetch(`${popularShowsUrl}`)
      .then(response => response.text())
      .then(body => {
        var collected = []
        const $ = cheerio.load(body)
        $('#main > div > span > div > div > div.lister > table > tbody > tr').each((index, element) => {
          const $element = $(element)
          const $title = $element.find('td.titleColumn')
          const $rate = $element.find('td.ratingColumn.imdbRating')
          const result = $title.text().split('(')
          const title = result[0].trim()
          const rate = $rate.text().trim()
          if (rate.length && rate.length > 0 && Number(rate) > 5.9 && req.body.search.toLowerCase() === title.toLowerCase()) {
            collected.push({ rate: Number(rate), id: title, type: 'Series' })
          }
        })
        return collected
      }).then(collected => {
        return collected
      })
    const collection = [].concat(movies, serieses)
    collection.sort((a, b) => {
      return a.rate - b.rate
    })
    if (auth.checkAuthenticated(req)) {
      res.render('extra/trending1', { rows: collection, message1: 'The Trending List of IMDB was searched.', message2: 'The result of the search:', url: '/find-trending' })
    } else {
      res.render('extra/trending2', { rows: collection, message1: 'The Trending List of IMDB was searched.', message2: 'The result of the search:', url: '/find-trending' })
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = controller
