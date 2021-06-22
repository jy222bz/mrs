/**
 * @author Jacob Yousif
 * A controller for the home page.
 */

'use strict'

const homeController = {}
const Snippet = require('../models/snippetSchema')

/**
 * This method it responds to the GET request when
 * the user view the snippets.
 * It renders the home page.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
homeController.index = (req, res) => {
  Snippet.find().then((result) => {
    if (typeof req.session !== 'undefined' && req.session.isAuth) {
      res.render('home/panel', { result })
    } else {
      res.render('home/index', { result })
    }
  }).catch((err) => {
    console.log(err)
  })
}

/**
 * This method it responds to the GET request when
 * the user wants to view a snippet.
 * It renders the snippet page.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
homeController.indexGetSnippet = async (req, res) => {
  try {
    const id = req.params.id
    if (typeof req.session !== 'undefined' && req.session.isAuth) {
      const snipp = await Snippet.findById(id)
      if (req.session.userID.equals(snipp.ownerID)) {
        res.render('home/snippet', { snippet: snipp })
      } else {
        res.render('home/snippet2', { snippet: snipp })
      }
    } else {
      res.status(403)
      await res.render('forbidden/forbidden')
    }
  } catch (error) {
    console.log(error)
  }
}

/**
 * This method it responds to the DELETE request when
 * the user wans to delete a snippet.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
homeController.indexDeleteSnippet = async (req, res) => {
  try {
    const id = req.params.id
    const snippet = await Snippet.findById(id)
    if (typeof req.session !== 'undefined' && req.session.isAuth && req.session.userID.equals(snippet.ownerID)) {
      await snippet.delete()
      res.json({ redirect: '/snippets' })
    } else {
      res.status(403)
      await res.render('forbidden/forbidden')
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = homeController
