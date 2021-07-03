
const authenticator = {}

/**
 * @param req
 * @param res
 * @param next
 */
authenticator.checkAuthenticated = (req) => {
  if (typeof req.session.isAuth !== 'undefined' && req.session.isAuth) {
    return true
  }

  return false
}

/**
 * @param req
 * @param res
 * @param next
 */
authenticator.checkNotAuthenticated = (req) => {
  if (typeof req.session.isAuth !== 'undefined' && req.session.isAuth) {
    return false
  }
  return true
}

module.exports = authenticator
