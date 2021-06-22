/**
 * @author Jacob Yousif
 * A controller for the create form.
 */

'use strict'
const addController = {}
const Snippet = require('../models/snippetSchema')

/**
 * This method it responds to the GET request when
 * the user wants to create a snippet.
 * It renders the create form.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
addController.get = async (req, res) => {
  try {
    if (typeof req.session !== 'undefined' && req.session.isAuth) {
      const message = req.flash('message')
      delete req.session.message
      await res.render('add/add', { message: message, csrfTocken: req.csrfToken() })
    } else {
      res.status(403)
      await res.render('forbidden/forbidden')
    }
  } catch (error) {
    console.log(error)
  }
}

/**
 * This method it responds to the Post request when
 * the user wants to create a snippet.
 * It create a snippet and saves in the DB.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
addController.post = async (req, res) => {
  try {
    if (typeof req.session !== 'undefined' && req.session.isAuth) {
      const { tag, title, snippet } = req.body
      const snippetNEW = new Snippet({
        tag: tag,
        title: title,
        author: req.session.username,
        snippet: snippet,
        ownerID: req.session.userID
      })
      await snippetNEW.save()
      res.redirect('/')
    } else {
      res.status(403)
      await res.render('forbidden/forbidden')
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = addController
