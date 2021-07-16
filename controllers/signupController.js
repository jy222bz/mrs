/**
 * @author Jacob Yousif
 * A controller for the signup page.
 */
require('dotenv').config()
const db = require('../database')
const bcrypt = require('bcrypt')
const auth = require('../validators/authenticator')
const validator = require('../validators/validatror')
const controller = {}
/**
 * This method responds to the GET request when
 * the user wants to signup
 * It renders the signup page.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 * @returns {object} the Express redirection.
 */
controller.get = async (req, res) => {
  if (auth.checkNotAuthenticated(req)) {
    try {
      const message = req.flash('message')
      delete req.session.message
      res.render('log/register', { message: message, title: 'Signup', url: '/find-review' })
    } catch (error) {
      console.log(error)
    }
  } else {
    return res.redirect('/')
  }
}

/**
 * This method it responds to the Post request when
 * submits the info.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 * @returns {object} the Express redirection.
 */
controller.post = async (req, res) => {
  if (auth.checkNotAuthenticated(req)) {
    try {
      const { firstName, lastName, email, password } = req.body
      const fullName = firstName.toUpperCase() + ' ' + lastName.toUpperCase()
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      if (!validator.isName(firstName) || !validator.isName(lastName)) {
        res.render('log/register', { message: 'The format of the e-mail is not correct', url: '/find-review' })
      } else if (!validator.isEmail(email)) {
        res.render('log/register', { message: 'The name contains invalid characters.', url: '/find-review' })
      } else if (!validator.isPassword(password)) {
        res.render('log/register', { message: 'The password is not according to the rules', url: '/find-review' })
      } else {
        render(req, res, email, firstName, lastName, fullName, hashedPassword)
      }
    } catch (error) {
      console.log(error)
      res.render('log/register', { message: 'There was an error with the registration!', url: '/find-review' })
    }
  } else {
    return res.redirect('/')
  }
}
/**
 * It saves the information in the database and renders the login page.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 * @param {string} email the user's email.
 * @param {string} firstName the user's first name.
 * @param {string} lastName the user's last name.
 * @param {string} fullName the user's full name.
 * @param {string} hashedPassword the hashed password.
 */
function render (req, res, email, firstName, lastName, fullName, hashedPassword) {
  db.getConnection((error, connection) => {
    if (error) {
      console.log(error)
      process.exit(1)
    }
    connection.query('SELECT * FROM users WHERE email = ?', [email.toLowerCase()], (err, rows) => {
      connection.release()
      if (!err) {
        if (rows.length) {
          res.render('log/register', { message: 'The e-mail exists in the Database!' })
        } else {
          connection.query('INSERT INTO users SET firstName = ?, lastName = ?, fullName = ?, email = ?, password = ?', [firstName.toUpperCase(), lastName.toUpperCase(), fullName, email.toLowerCase(), hashedPassword], (e, rows) => {
            connection.release()
            if (!e) {
              req.flash('message', 'Successful Registration! Sign-in now with your creditianls.')
              res.redirect('/login')
            }
          })
        }
      }
    })
  })
}
module.exports = controller
