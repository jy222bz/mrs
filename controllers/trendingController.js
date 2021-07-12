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
var collected = []

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
    await scrapPopularPictures(popularMoviesUrl, 'Movie').then(() => {
      scrapPopularPictures(popularShowsUrl, 'Series').then(() => {
        if (auth.checkAuthenticated(req)) {
          return res.render('extra/trending1', { rows: collected })
        } else {
          return res.render('extra/trending2', { rows: collected })
        }
      })
    })
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
      connection.query('SELECT m.name, s.name FROM movies m, serieses s WHERE m.name = ? OR s.name = ?', [req.params.id, req.params.id], (err, row) => {
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
    res.render('extra/find1', { exist, none })
  } else {
    res.render('extra/find2', { exist, none })
  }
}

/**
 * It scrapes the IMDB page and collects the titles and the rates of the Pictures that are equal or greater than 6.
 *
 * @param {string} url for the target page for web-scraping.
 * @param {string} type whether a movie or series.
 */
async function scrapPopularPictures (url, type) {
  fetch(`${url}`)
    .then(response => response.text())
    .then(body => {
      const $ = cheerio.load(body)
      $('#main > div > span > div > div > div.lister > table > tbody > tr').each((index, element) => {
        const $element = $(element)
        const $title = $element.find('td.titleColumn')
        const $rate = $element.find('td.ratingColumn.imdbRating')
        const result = $title.text().split('(')
        const title = result[0].trim()
        const rate = $rate.text().trim()
        if (rate.length && rate.length > 0 && Number(rate) > 5.9) {
          collected.push({ rate: Number(rate), id: title, type: type })
        }
      })
    })
  collected.sort((a, b) => {
    return a.rate - b.rate
  })
}
module.exports = controller
