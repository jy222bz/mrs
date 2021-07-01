
const authenticator = {}

/**
 * @param req
 * @param res
 * @param next
 */
authenticator.checkAuthenticated = (req) => {
  if (req.isAuthenticated()) {
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
  if (req.isAuthenticated()) {
    return false
  }
  return true
}

module.exports = authenticator
