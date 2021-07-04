/**
 * @author Jacob Yousif
 * A controller for the home page.
 */
require('dotenv').config()
const auth = require('../validators/authenticator')
const controller = {}

/**
 * This method it responds to the GET request when
 * the user view the snippets.
 * It renders the home page.
 *
 * @param {object} req the Express request.
 * @param {object} res the Express response.
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
