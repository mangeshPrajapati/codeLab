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
    var update = false;
    const sql = "update user_code set code = ? where id = ?"
    conn.query(sql,[code,id], (err) => {
        if(err) throw err;
        update = true
        res.send({
            update
        })
    })
})

module.exports = app;