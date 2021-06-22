/**
 * @author Jacob Yousif
 * A controller for the sign-in form.
 */

'use strict'

const signinController = {}
const User = require('../models/userSchema')
const crypt = require('bcrypt')

/**
 * This method it responds to the GET request when
 * the user wans to signin.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
signinController.get = async (req, res) => {
  const message = req.flash('message')
  if (typeof req.session === 'undefined' || !req.session.isAuth) {
    delete req.session.message
    res.render('signin/signin', { message: message, csrfTocken: req.csrfToken() })
  } else {
    res.redirect('/snippets')
  }
}

/**
 * This method it responds to the POST request when
 * the user wans to submit for authentications for signin.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 * @returns {object} Express response.
 */
signinController.post = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      await req.flash('message', 'The user does not exist!')
      return res.redirect('/sign-in')
    }
    const isMatch = await crypt.compare(password, user.password)
    if (!isMatch) {
      await req.flash('message', 'The password does not match!')
      return res.redirect('/sign-in')
    }
    req.session.isAuth = true
    req.session.userID = user._id
    req.session.username = user.name
    res.redirect('/snippets')
  } catch (error) {
    console.console.log(error)
  }
}

module.exports = signinController
