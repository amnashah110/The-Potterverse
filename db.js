const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config(); // load environment variables

// sql connection
const connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
});

let db_status = '';

connection.connect(function(error) {
    if(error) {
        console.error("Error connecting to database");
    } else {
        console.log("Connected to database:", process.env.DATABASE);
    }
});

module.exports = connection;