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
const addReview = require('./routes/addReviewRouter')
const directors = require('./routes/directorsRouter')
const movies = require('./routes/moviesRouter')
const series = require('./routes/seriesesRouter')
const overview = require('./routes/overviewRouter')
const signin = require('./routes/signinRouter')
const signout = require('./routes/signoutRouter')
const signup = require('./routes/signupRouter')
const updateReview = require('./routes/updateReviewRouter')
const updateDirector = require('./routes/updateDirectorRouter')
const updateSeries = require('./routes/updateSeriesRouter')
const updateMovie = require('./routes/updateMovieRouter')
const trending = require('./routes/trendingRouter')
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
 * Middlewares.
 */
app.use(flash())
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))

/**
 * Set the session and passport.
 */
app.use(session({
  secret: process.env.SECERT,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
    httpOnly: true
  }
}))

/**
 * Routes.
 */
app.use(home, addMovie, addDirector, addReview, trending, addSeries, overview, directors, movies, series, updateDirector, signin, signup, signout, updateReview, updateMovie, updateSeries)

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
  console.log(err)
  res.render('errors/internal')
})

app.listen(port)
