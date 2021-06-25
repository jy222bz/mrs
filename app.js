/**
 * @author Jacob Yousif
 * The main entery point to the server.
 */

/**
 * The required imports:
 * Express, express-session, connect-mongodb-session, path,
 * morgan, the routers and flash.
 */
const express = require('express')
require('dotenv').config()
const path = require('path')
const logger = require('morgan')
const home = require('./routes/homeRouter')
const addMovie = require('./routes/addMovieRouter')
const addDirector = require('./routes/addDirectorRouter')
const addSeries = require('./routes/addSeriesRouter')
const search = require('./routes/searchRouter')
const hbs = require('express-handlebars')
const app = express()
const flash = require('connect-flash')
const session = require('express-session')
const port = process.env.PORT || 3000

/**
 * Set view engine.
 */
app.engine('hbs', hbs({ extname: '.hbs' }))
app.set('view engine', 'hbs')

/**
 * Set the session.
 */
app.use(session({
  secret: 'o-19&yhXq$0m3&!k7y?mK%O98&rX6&9o-=1q$%',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
    httpOnly: true
  }
}))

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
app.use(home, addMovie, addDirector, search, addSeries)

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
  res.render('errors/404')
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
  res.render('errors/internal')
})

app.listen(port)
