/**
 * @author Jacob Yousif
 * The main entery point to the server.
 */

'use strict'

/**
 * The required imports:
 * Express, express-session, connect-mongodb-session, path,
 * morgan, the routers and flash.
 */
const express = require('express')
const mysql = require('mysql2')
const path = require('path')
const logger = require('morgan')
const home = require('./routes/homeRouter')
const addPost = require('./routes/addRouter')
const addAuthor = require('./routes/addAuthorRouter')
const flash = require('connect-flash')
const app = express()

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jacob1983',
  database: 'posts_db',
  port: '3306'
})

db.connect((error) => {
  if (error) {
    console.log(error)
    process.exit(1)
  } else {
    console.log('MySQL is connected...')
  }
})

app.set('view engine', 'ejs')

/**
 * Middlewares.
 */
app.use(flash())
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))

/**
 * Routes.
 */
app.use(home, addPost, addAuthor)

/**
 * It handels the 404 error and renders the error page.
 * 404 - Page not found.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 * @param {object} next the Next Method.
 */
app.use('*', (req, res, next) => {
  res.status(404)
  res.render('errors/404.ejs')
})

/**
 * It handels errors and renders the internal error page.
 *
 * @param {object} err the error type.
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 * @param {object} next the Next Method.
 */
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render(path.join(__dirname, 'views', 'errors', 'internal.ejs'))
})

app.listen(3000)
