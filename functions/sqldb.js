var mysql = require('mysql');

var sqldb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'imageint'
});

sqldb.connect();

module.exports = sqldb;