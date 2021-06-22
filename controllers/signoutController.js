/**
 * @author Jacob Yousif
 * A controller for the signout form.
 */

'use strict'

const signoutController = {}

/**
 * This method it responds to the GET request when
 * the user wans to signout.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 */
signoutController.get = async (req, res) => {
  try {
    req.session.destroy()
    res.redirect('/sign-in')
  } catch (error) {
    console.log(error)
  }
}

module.exports = signoutController
