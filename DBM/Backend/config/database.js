const mysql = require('mysql');

module.exports = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE_NAME,
    user: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    charset : 'utf8mb4'
})