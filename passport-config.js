const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
/**
 * It intilizes the passport object
 *
 * @param {object} passport object.
 * @param getUserEmail
 * @param getUserByEmail
 * @param getUserByID
 */
module.exports = function init (passport, getUserByEmail, getUserByID) {
  /**
   * @param email
   * @param password
   * @param done
   */
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email)
    if (user === null) {
      return done(null, false, 'No User Match For the Given E-mail!')
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, 'Password Incorrect')
      }
    } catch (error) {
      return done(error)
    }
  }
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((user, done) => { return done(null, getUserByID(user.id)) })
}
