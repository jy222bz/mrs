/**
 * @author Jacob Yousif
 * The database connection.
 */

const mysql = require('mysql2')

/**
 * Connecting the database and exporting the connection.
 *
 */
const db = mysql.createPool({
  connectionLimit: 1000,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

module.exports = db
