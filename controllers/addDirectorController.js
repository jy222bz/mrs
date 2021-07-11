/**
 * @author Jacob Yousif
 * A controller for the add director form.
 */
const db = require('../database')
require('dotenv').config()
const auth = require('../validators/authenticator')
const controller = {}

/**
 * This method responds to the GET request when
 * the user wants to add a director to the collection of directors.
 * It renders the add director form.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 * @returns {object} res the Express redirection.
 */
controller.get = async (req, res) => {
  if (auth.checkAuthenticated(req)) {
    try {
      const message = req.flash('message')
      delete req.session.message
      await res.render('add/add-director', { message: message, title: 'Add Director' })
    } catch (error) {
      console.log(error)
    }
  } else {
    return res.redirect('/login')
  }
}

/**
 * This method responds to the Post request when
 * the user wants to add the director to the database.
 * It adds the director to the database.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 * @returns {object} res the Express redirection.
 */
controller.post = async (req, res) => {
  const { firstName, lastName, age, origin } = req.body
  const fullName = firstName + ' ' + lastName
  if (auth.checkAuthenticated(req)) {
    try {
      db.getConnection((error, connection) => {
        if (error) {
          console.log(error)
          process.exit(1)
        }
        connection.query('INSERT INTO directors SET firstName = ?, lastName = ?, age = ?, fullName = ?, origin = ?', [firstName.toUpperCase(), lastName.toUpperCase(), age, fullName.toUpperCase(), origin.toUpperCase()], (err, rows) => {
          connection.release()
          if (!err) {
            req.flash('message', 'It was successfully added!')
            res.redirect('/directors/add-director')
          }
        })
      })
    } catch (error) {
      console.log(error)
    }
  } else {
    return res.redirect('/login')
  }
}

module.exports = controller
