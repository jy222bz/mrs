/**
 * @author Jacob Yousif
 * A controller for the home page.
 */
require('dotenv').config()
const db = require('../database')
const bcrypt = require('bcrypt')
const auth = require('../validators/authenticator')
const validator = require('../validators/validatror')
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
    try {
      const message = req.flash('message')
      delete req.session.message
      res.render('log/register', { message: message, title: 'Signup' })
    } catch (error) {
      console.log(error)
    }
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
    try {
      const { firstName, lastName, email, password } = req.body
      const fullName = firstName.toUpperCase() + ' ' + lastName.toUpperCase()
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      if (!validator.isName(firstName) || !validator.isName(lastName)) {
        res.render('log/register', { message: 'The format of the e-mail is not correct' })
      } else if (!validator.isEmail(email)) {
        res.render('log/register', { message: 'The name contains invalid characters.' })
      } else if (!validator.isPassword(password)) {
        res.render('log/register', { message: 'The password is not according to the rules' })
      } else {
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
          }
          connection.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
            connection.release()
            if (!err) {
              if (rows.length) {
                res.render('log/register', { message: 'The e-mail exists in the Database!' })
              } else {
                connection.query('INSERT INTO users SET firstName = ?, lastName = ?, fullName = ?, email = ?, password = ?', [firstName.toUpperCase(), lastName.toUpperCase(), fullName, email, hashedPassword], (error, rows) => {
                  connection.release()
                  if (!error) {
                    req.flash('message', 'Successful Registration! Sign-in now with your creditianls.')
                    res.redirect('/login')
                  }
                })
              }
            }
          })
        })
      }
    } catch (error) {
      console.log(error)
      res.render('log/register', { message: 'There was an error with the registration!' })
    }
  } else {
    return res.redirect('/')
  }
}
module.exports = controller
