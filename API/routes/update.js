const { json } = require('body-parser')
const express = require('express')
const conn = require('../private/db')
const userId = require('./login')
const session = require("express-session");
const app = express()

app.post('/update/:id',(req, res) => {
    var idObj = req.params;
    var id = idObj.id
    const code = req.body.code
    var msg;
    const sql = "update user_code set code = ? where id = ?"
    conn.query(sql,[code,id], (err) => {
        if(err) throw err;
        msg = "Data Updated"
        res.send(msg)
    })
})

module.exports = app;