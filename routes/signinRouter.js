/**
 * Home Router.
 *
 * @author Jacob Yousif
 * @version 1.0.0
 */
const passport = require('passport')
const initPassport = require('../passport-config')
// initPassport.init(passport, email => )

const express = require('express')
const router = express.Router()
const controller = require('../controllers/signinController')

/**
 * The routes for the home.
 */
router
  .get('/login', controller.get)
  .post('/login', passport.authenticate('local', {
    successRedirect: '/', failureFlash: true
  }))

module.exports = router
