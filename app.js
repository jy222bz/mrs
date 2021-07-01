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
const search = require('./routes/addToMMSRouter')
const directors = require('./routes/directorsRouter')
const movies = require('./routes/moviesRouter')
const series = require('./routes/seriesesRouter')
const bestBox = require('./routes/searchRouter')
const signin = require('./routes/signinRouter')
const signout = require('./routes/signoutRouter')
const signup = require('./routes/signupRouter')
const updateDirector = require('./routes/updateDirectorRouter')
const hbs = require('express-handlebars')
const app = express()
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const methodOverride = require('method-override')
const port = process.env.PORT || 3000
const initPassport = require('./passport-config')
// initPassport.init(passport, email => )

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
 * Set the session.
 */
app.use(session({
  secret: process.env.SECERT,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})


/**
 * Routes.
 */
app.use(signin, signup)

app.use(home, addMovie, addDirector, search, addSeries, bestBox, directors, movies, series, updateDirector, signout)

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
