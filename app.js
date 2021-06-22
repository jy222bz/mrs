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
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
const URI = 'mongodb+srv://lnu:LNU1234@a2cluster.9f4oq.mongodb.net/my_database?retryWrites=true&w=majority'
const path = require('path')
const logger = require('morgan')
const app = express()
const home = require('./routes/homeRouter')
const signup = require('./routes/signupRouter')
const signin = require('./routes/signinRouter')
const addSnippet = require('./routes/addRouter')
const signout = require('./routes/signoutRouter')
const edit = require('./routes/editRouter')
const search = require('./routes/searchRouter')
const DB = require('./mongoose')
const flash = require('connect-flash')

app.set('view engine', 'ejs')
DB.connect().then(() => {}).catch((err) => {
  console.log(err)
  process.exit(1)
})
const store = new MongoDBSession({
  uri: URI,
  collection: 'sessions'
})
app.use(session({
  secret: 'o-19&yhXq$0m3&!k7y?mK%O98&rX6&9o-=1q$%',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
    httpOnly: true
  },
  store: store
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
