const { json } = require('body-parser')
const express = require('express')
const conn = require('../private/db')
const userId = require('./login')
const session = require("express-session");
const app = express()

app.get('/view/:id',(req, res) => {
    var idObj = req.params;
    var id = idObj.id
    
    const sql = "select * from usercode where userid = ?"
    conn.query(sql,[id], (err, data) => {
        if(err) throw err;
        res.status(201).json(data)
    })
})

module.exports = app;