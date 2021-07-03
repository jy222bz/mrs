const LocalStrategy = require('passport-local').Strategy
const crypt = require('bcrypt')
const db = require('./database')

/**
 * It intilizes the passport object
 *
 * @param {object} passport object.
 * @param getUserEmail
 * @param getUserByEmail
 * @param getUserByID
 */
module.exports = function init (passport) {
  passport.use(new LocalStrategy(async ({ usernameField: email }, password, authCheckDone) => {
    const user = getByEmail(email)
    console.log(user)
    if (user === null) {
      return authCheckDone(null, false)
    }
    const isMatch = await crypt.compare(password, user.password)
    if (!isMatch) {
      return authCheckDone(null, false)
    }
    return authCheckDone(null, user)
  }))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => { return done(null, { id }) })
}

/**
 * @param email
 */
function getByEmail (email) {
  var result
  try {
  /**
   * Exporting the DB connection.
   *
   * @param {object} req the Express request.
   * @param {object} res the Express response.
   */
    db.getConnection((error, connection) => {
      if (error) {
        console.log(error)
        process.exit(1)
      } else {
        console.log('MySQL is connected. Connection ID: ' + connection.threadId)
      }
      connection.query('SELECT * FROM useers WHERE email = ?', [email], (err, rows) => {
        connection.release()
        if (!err) {
          if (rows.length) {
            result = rows[0]
          } else {
            result = null
          }
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
  return result
}
