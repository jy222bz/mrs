/**
 * @author Jacob Yousif
 * A Database connection.
 */
const mong = require('mongoose')
const DB = 'mongodb+srv://your_connection'

/**
 * Exporting the function.
 */
exports.connect = connect

/**
 * It initializes the database.
 *
 * @returns {object} DB connection.
 */
async function connect () {
  mong.connection.on('connected', () => console.log('DB is good to go! It is connected!'))
  mong.connection.on('error', () => console.log('There is an error!'))
  mong.connection.on('disconnected', () => console.log('DB id disconnected!'))

  process.on('SIGNIN', () => {
    mong.connection.close(() => {
      console.log('Connection is closed!')
      process.exit(0)
    })
  })

  return mong.connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
