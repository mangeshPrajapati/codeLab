const express = require('express')
const conn = require('../private/db')
const app = express()

app.post('/save',(req, res) => {
    const cname = req.body.cname
    const code = req.body.code
    const user_id = req.body.user_id
    const sql = 'insert into user_code(cname, code, user_id) values(?,?,?)'
    if(user_id != 0){
        conn.query(sql,[cname, code, user_id],(err, result)=>{
            if(err) throw err;
            res.send('Inserted')
        })
    }
    
})

module.exports = app; 