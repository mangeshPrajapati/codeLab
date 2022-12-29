const express = require('express')
const conn = require('../private/db')
const app = express()

app.delete('/delete/:iddelete',(req, res) => {
    var idObj = req.params;
    var id = idObj.iddelete
    const sql = "delete from usercode where id = ?";
    conn.query(sql,[id],(err)=>{
        if(err) throw err;
        res.send("Entry deleted")
    })
})

module.exports = app;