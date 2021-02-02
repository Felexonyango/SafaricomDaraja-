require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser')
var cors =require('cors')

var paymentRoute = require('./routes/payement');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(bodyParser.json())

app.use('/', paymentRoute);
app.listen(5000,()=>{
  console.log("server  is listening at port 5000")
})

module.exports = app;
