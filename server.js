var express = require('express');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');

var app = express();



var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET }));

app.use(passport.initialize());
app.use(passport.session());

// var connectionString = 'mongodb://127.0.0.1:27017/fall';
// var connectionString ='mongodb://sanamsoodan:harman587@ds033066.mlab.com:33066/singh-sanamdeep';
// var mongoose = require("mongoose");
// mongoose.connect(connectionString);

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// require ("./test/app.js")(app);

// var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
// var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;
//
// app.listen(port, ipaddress);



//console.log(process.env);

// var assignment=require("./assignment/app");
// assignment(app);

var project=require("./project/app");
project(app);

app.listen(3000);