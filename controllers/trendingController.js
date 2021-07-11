/**
 * @author Jacob Yousif
 * A controller for the home page.
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
 * the user view the snippets.
 * It renders the home page.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
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
 * the user view the snippets.
 * It renders the home page.
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
        var non = []
        if (!err) {
          if (row.length && row.length > 0) {
            exist.push({ name: req.params.id.toUpperCase() })
          } else {
            non.push({ name: req.params.id.toUpperCase() })
          }
          if (auth.checkAuthenticated(req)) {
            res.render('extra/find1', { exist, non })
          } else {
            res.render('extra/find2', { exist, non })
          }
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 * @param url
 * @param collection
 * @param type
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
}
module.exports = controller
