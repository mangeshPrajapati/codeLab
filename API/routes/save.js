const express = require('express')
const conn = require('../private/db')
const app = express()

app.post('/save',(req, res) => {
    console.log('called')
    const cname = req.body.cname
    const code = req.body.code
    const userid = req.body.userid
    const sql = 'insert into usercode(name, code, userid) values(?,?,?)'
    conn.query(sql,[cname, code, userid],(err, result)=>{
        if(err) throw err;
        res.send('Inserted')
    })
})

module.exports = app;