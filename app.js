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
const mysql = require('mysql')
const path = require('path')
const logger = require('morgan')
const connection = mysql.createConnection({
  host : 'localhost',
  user: 'jacob1983',
  password: '12345'
  database: 'my_db'
})


const app = express()
const home = require('./routes/homeRouter')
const addSnippet = require('./routes/addRouter')
const edit = require('./routes/editRouter')
const search = require('./routes/searchRouter')
const flash = require('connect-flash')

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
app.use(home, addSnippet, signout, signup, edit, search, signin)

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

app.listen(8000)
