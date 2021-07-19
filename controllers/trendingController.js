/**
 * @author Jacob Yousif
 * A controller for the Trending page.
 */
const db = require('../database')
require('dotenv').config()
const auth = require('../validators/authenticator')
const controller = {}
const fetch = require('node-fetch')
const cheerio = require('cheerio')

/**
 * This method it responds to the GET request when
 * the user view the Trending movies and tv shows from IMDB.
 * It renders the Trending page.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 * @returns {object} the Express redirection.
 */
controller.get = async (req, res) => {
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
          if (rate.length && rate.length > 0 && Number(rate) > 5.9) {
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
          if (rate.length && rate.length > 0 && Number(rate) > 5.9) {
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
      res.render('extra/trending1', { rows: collection, url: '/find-trending' })
    } else {
      res.render('extra/trending2', { rows: collection, url: '/find-trending' })
    }
  } catch (error) {
    console.log(error)
  }
}

/**
 * This method it responds to the GET request when
 * the user check whether a picture exists in the database.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
controller.find = async (req, res) => {
  try {
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      connection.query('SELECT movie.name, series.name FROM movies movie, serieses series WHERE movie.name = ? OR series.name = ?', [req.params.id, req.params.id], (err, row) => {
        connection.release()
        var exist = []
        var none = []
        if (!err) {
          if (row.length && row.length > 0) {
            exist.push({ name: req.params.id.toUpperCase() })
          } else {
            none.push({ name: req.params.id.toUpperCase() })
          }
          render(exist, none, req, res)
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 * It checks the authentication and renders the find page and presents the results of the check.
 *
 * @param {object[]} exist an object array.
 * @param {object[]} none an object array.
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
function render (exist, none, req, res) {
  if (auth.checkAuthenticated(req)) {
    res.render('extra/find1', { exist, none,  url: '/find-trending' })
  } else {
    res.render('extra/find2', { exist, none,  url: '/find-trending' })
  }
}

module.exports = controller
