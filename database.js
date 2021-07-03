
const mysql = require('mysql2')
const database = {}

/**
 * The database connection.
 *
 * @returns {object} the database connestion.
 */
database.getDB = () => {
  return mysql.createPool({
    connectionLimit: 1000,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  })
}
