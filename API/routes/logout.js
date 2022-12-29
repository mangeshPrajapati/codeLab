const express = require("express");
const cors = require("cors");
const mysql = require('mysql')
const conn = require('../private/db')
const bodyParser = require('body-parser');
const session = require("express-session");
const app = express();

app.get('/logout',(req, res) => {
    req.session.destroy()
    //res.redirect('#')
})

module.exports = app