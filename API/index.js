const express = require("express");
const cors = require("cors");
const mysql = require('mysql')
const conn = require('./private/db')
const bodyParser = require('body-parser')
const session = require('express-session')

//Routes for database operaions 
const register = require('./routes/register')
const login = require('./routes/login')
const logout = require('./routes/logout')
const save = require('./routes/save')
const view = require('./routes/view')
const delData = require('./routes/delete')
const compile = require('./routes/compile')
const getCode = require('./routes/getCode')
const update = require('./routes/update')

const app = express();

const port = 8000;

//To accept data in json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Session creation
app.use(session({ 
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))


//Used routes 
app.use('/', register)
app.use('/', login)
app.use('/', logout)
app.use('/', save)
app.use('/', view)
app.use('/', delData)
app.use('/',compile)
app.use('/',getCode)
app.use('/',update)


app.listen(port,() => {
    console.log(`Running on Port ${port}`)
})