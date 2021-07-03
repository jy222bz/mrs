/**
 * @author Jacob Yousif
 * A controller for the home page.
 */
const db = require('../database')
require('dotenv').config()
const auth = require('../validators/authenticator')
const crypt = require('bcrypt')
const controller = {}
/**
 * This method it responds to the GET request when
 * the user view the snippets.
 * It renders the home page.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
controller.get = async (req, res) => {
  if (auth.checkNotAuthenticated(req)) {
    const message = req.flash('message')
    delete req.session.message
    await res.render('log/signin', { message: message })
  } else {
    return res.redirect('/')
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
controller.post = async (req, res) => {
  if (auth.checkNotAuthenticated(req)) {
    const { email, password } = req.body
    try {
      /**
       * Exporting the DB connection.
       *
       * @param {object} req the Express request.
       * @param {object} res the Express response.
       */
      db.getConnection((error, connection) => {
        if (error) {
          console.log(error)
          process.exit(1)
        } else {
          console.log('MySQL is connected. Connection ID: ' + connection.threadId)
        }
        connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, rows) => {
          connection.release()
          if (!err) {
            if (rows.length) {
              if (await crypt.compare(password, rows[0].password)) {
                req.session.isAuth = true
                req.session.userID = rows[0].id
                return res.redirect('/')
              } else {
                return res.render('log/signin', { message: 'There is an error with the passwrod.' })
              }
            } else {
              return res.render('log/signin', { message: 'There is an error with the email.' })
            }
          }
        })
      })
    } catch (error) {
      console.log(error)
    }
  } else {
    return res.redirect('/')
  }
}

module.exports = controller
