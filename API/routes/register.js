const express = require("express");
const cors = require("cors");
const mysql = require('mysql')
const conn = require('../private/db')
const bodyParser = require('body-parser')
const app = express();

//Registering user
app.post('/register', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var msql = "SELECT * FROM user WHERE username = ?;";

    var msg=''
    var isInsert=false

    conn.query(msql,[username], function(err, result){
        if(err) throw err;
        if(result.length > 0){
            msg = username+ " already exist"
        }
        else {
            var sql = "INSERT INTO user(username, password) VALUES(?,?);";
            conn.query(sql,[username,password], function(err, result){
                if(err) throw err;
                console.log(result.insertId)
                
            });
            msg="Registration Success Sign in now";
            isInsert=true
        }
        res.send({
            msg,
            isInsert
        })
    });
})

module.exports = app;