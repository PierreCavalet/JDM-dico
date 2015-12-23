
// modules =====================================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var fs = require('fs');
var xml2js = require('xml2js');


// configuration ===============================================================

// config files
var db = require('./app/config/db');

// set the port
var port = process.env.port || 8888;

// connect to mongoDB database
var connection = mongoose.connect(db.url);

// set the static files location
app.use(express.static(__dirname + '/public'));

// routes
var words = require('./app/routes/words');
app.use('/api', words);

// front end routes for angular
app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

// start application ===========================================================
app.listen(port);
console.log('The application is running');

//
// var parser = new xml2js.Parser();
// app.get('/word', function(req, res) {
//
// });
