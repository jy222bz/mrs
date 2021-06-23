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
const sql = require('./database')
const path = require('path')
const logger = require('morgan')
const home = require('./routes/homeRouter')
const addPost = require('./routes/addRouter')
const addAuthor = require('./routes/addAuthorRouter')
const addSnippet = require('./routes/addSnippetRouter')
const search = require('./routes/searchRouter')
const hbs = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000

/**
 * DB connection.
 */
sql.connect()

/**
 * Set view engine.
 */
app.engine('hbs', hbs({ extname: '.hbs' }))
app.set('view engine', 'hbs')

/**
 * Middlewares.
 */
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))

/**
 * Routes.
 */
app.use(home, addPost, addAuthor, search, addSnippet)

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
