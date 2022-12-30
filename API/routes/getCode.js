const { json } = require('body-parser')
const express = require('express')
const conn = require('../private/db')
const userId = require('./login')
const session = require("express-session");
const app = express()

app.get('/getcode/:id',(req, res) => {
    var idObj = req.params;
    var id = idObj.id
    const sql = "select code from user_code where id = ?"
    conn.query(sql,[id], (err, data) => {
        if(err) throw err;
        res.json(data)
    })
})

module.exports = app;