const mysql = require('mysql2')
require('dotenv').config()

const db = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

db.getConnection((error, connection) => {
  if (error) {
    console.log(error)
    process.exit(1)
  } else {
    console.log('MySQL is connected. Connection ID: ' + connection.threadId)
  }
})

module.exports = db
