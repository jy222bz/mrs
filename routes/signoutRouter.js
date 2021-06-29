/**
 * Home Router.
 *
 * @author Jacob Yousif
 * @version 1.0.0
 */

'use strict'

const express = require('express')
const router = express.Router()

/**
 * The routes for the home.
 */
router.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

module.exports = router
