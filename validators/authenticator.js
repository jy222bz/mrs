
/**
 * @author Jacob Yousif
 */

const authenticator = {}

/**
 * This method checks whether user is authenticated.
 *
 * @param {object} req the Express request.
 * @returns {boolean} the truth value of authentication.
 */
authenticator.checkAuthenticated = (req) => {
  if (typeof req.session.isAuth !== 'undefined' && req.session.isAuth) {
    return true
  }

  return false
}

/**
 * It checks whether user is un-authenticated.
 *
 * @param {object} req the Express request.
 * @returns {boolean} the truth value of authentication.
 */
authenticator.checkNotAuthenticated = (req) => {
  if (typeof req.session.isAuth !== 'undefined' && req.session.isAuth) {
    return false
  }
  return true
}

module.exports = authenticator
