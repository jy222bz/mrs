const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jacob1983',
  database: 'posts_db',
  port: '3306'
})

db.connect((error) => {
  if (error) {
    console.log(error)
    process.exit(1)
  } else {
    console.log('MySQL is connected...')
  }
})

module.exports = db
