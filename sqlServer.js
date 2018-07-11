var Request = require('tedious').Request;

// Create connection to database
var config = 
   {
    user: USERNAME_SQLSERVER,
    userName:USERNAME_SQLSERVER,
    password: PASSWORD_SQLSERVER, 
    server: SERVER_SQLSERVER, 
    database: DB_SQLSERVER,
    options: 
    {
       encrypt: true,
       database: DB_SQLSERVER
    }
   }

module.exports = config