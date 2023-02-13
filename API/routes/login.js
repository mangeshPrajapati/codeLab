const express = require("express");
const cors = require("cors");
const mysql = require('mysql')
const conn = require('../private/db')
const bodyParser = require('body-parser');
const session = require("express-session");
const app = express();

var userId = null
module.exports.userId = userId
//Login user
app.post('/login',(req,res,next)=>{
    const username = req.body.username
    const password = req.body.password

    var isValid = false
    //var userId = null
    var msg = ''
    var sql = "SELECT * FROM user WHERE username = ? AND password = ?"
    conn.query(sql,[username, password],(err,result, field)=>{
        if(err) throw err
        if(result.length > 0){
            msg="Login Successfull "+username
            console.log("login success "+username)
            console.log(result[0].id)
            userId = result[0].id;
            isValid = true
            res.send({
                userId,
                username,
                isValid,
                msg
            })
            //res.send(msg)
            //res.redirect('/dashboard')
            
        }
        else {
            isValid = false
            msg="Sorry Username or Password may be incorrect"
            console.log("Not success "+ username)
            res.send({
                msg,
                isValid
            })
            
        }
    })
})

module.exports = app;
