/**
 * @author Jacob Yousif
 * A controller for the signout page.
 */
require('dotenv').config()
const auth = require('../validators/authenticator')
const controller = {}

/**
 * This method responds to the GET request when
 * the user logs out.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
 * @returns {object} the Express redirection.
 */
controller.get = async (req, res) => {
  if (auth.checkAuthenticated(req)) {
    req.session.isAuth = false
    req.session.userID = null
    req.session.author = null
    req.session.destroy()
    return res.redirect('/login')
  } else {
    return res.redirect('/')
  }
}
module.exports = controller
