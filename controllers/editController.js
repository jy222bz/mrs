/**
 * @author Jacob Yousif
 * A controller for the edit form.
 */

'use strict'

const editController = {}
const Snippet = require('../models/snippetSchema')

/**
 * This method it responds to the GET request when
 * the user wants to edit a snippet.
 * It renders the edit form.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
editController.get = async (req, res) => {
  try {
    const id = req.params.id
    const snippet = await Snippet.findById(id)
    if (typeof req.session !== 'undefined' && req.session.isAuth && req.session.userID.equals(snippet.ownerID)) {
      res.render('edit/edit', { snippet: snippet, csrfTocken: req.csrfToken() })
    } else {
      res.status(403)
      await res.render('forbidden/forbidden')
    }
  } catch (error) {
    console.log(error)
  }
}

/**
 * This method it responds to the POST request when
 * the user wants to edit a snippet.
 * It updates the snippet and saves it in the DB.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
editController.post = async (req, res) => {
  try {
    const id = req.params.id
    const snippet = await Snippet.findById(id)
    if (typeof req.session !== 'undefined' && req.session.isAuth && req.session.userID.equals(snippet.ownerID)) {
      await Snippet.findByIdAndUpdate(id, req.body)
      res.redirect('/')
    } else {
      res.status(403)
      await res.render('forbidden/forbidden')
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = editController
