const mysql = require('mysql');

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'codelab'
});

conn.connect(function(err){
    if(err) throw err;
    console.log("Connected");
});

module.exports = conn;