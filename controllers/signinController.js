/**
 * @author Jacob Yousif
 * A controller for the signin page.
 */
const db = require('../database')
require('dotenv').config()
const auth = require('../validators/authenticator')
const crypt = require('bcrypt')
const controller = {}
/**
 * This method responds to the GET request when
 * the user wants to sign in.
 * It renders the sign in form.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 * @returns {object} the Express redirection.
 */
controller.get = async (req, res) => {
  if (auth.checkNotAuthenticated(req)) {
    const message = req.flash('message')
    delete req.session.message
    await res.render('log/signin', { message: message, url: '/find-review' })
  } else {
    return res.redirect('/')
  }
}

/**
 * This method responds to the POST request when
 * the user logs in.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 * @returns {object} the Express redirection.
 */
controller.post = async (req, res) => {
  if (auth.checkNotAuthenticated(req)) {
    const { email, password } = req.body
    try {
      db.getConnection((error, connection) => {
        if (error) {
          console.log(error)
          process.exit(1)
        }
        connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, rows) => {
          connection.release()
          if (!err) {
            if (rows.length) {
              if (await crypt.compare(password, rows[0].password)) {
                req.session.isAuth = true
                req.session.userID = rows[0].id
                req.session.author = rows[0].fullName
                return res.redirect('/')
              } else {
                return res.render('log/signin', { message: 'There is an error with the passwrod.', url: '/find-review' })
              }
            } else {
              return res.render('log/signin', { message: 'There is an error with the email.', url: '/find-review' })
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
