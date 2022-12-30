const express = require('express')
const conn = require('../private/db')
const app = express()

app.delete('/delete/:id',(req, res) => {
    var idObj = req.params;
    var id = idObj.id
    const sql = "delete from user_code where id = ?";
    conn.query(sql,[id],(err)=>{
        if(err) throw err;
        res.send("Entry deleted")
    })
})

module.exports = app;