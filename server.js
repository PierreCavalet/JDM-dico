var express = require('express');
var fs = require("fs");
var app = express();

app.use(express.static(__dirname + "/public"));

app.get('/test', function(req, res) {
	
});

app.listen(8888);
