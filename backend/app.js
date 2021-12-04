const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const dotenv= require('dotenv').config()
const PORT = process.env.PORT || 3000

//db 
require('./db/db')();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); 
    next();
});

//express json data 
app.use(express.json());

//bodyparser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//view engine
app.set('view engine' , 'ejs')

//static file
app.use(express.static('public'))

//router
app.use('/',require('./router/router'))


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})

