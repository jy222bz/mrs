/**
 * @author Jacob Yousif
 * A controller for the create form.
 */

'use strict'
const addController = {}

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
    await res.render('add/add')
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
    await res.render('add/add')
  } catch (error) {
    console.log(error)
  }
}

module.exports = addController
