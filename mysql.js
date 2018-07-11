require('dotenv')
const mysql = require('mysql')
const connection = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME
})

module.exports = connection
