var express = require('express');
var fs = require("fs");
var app = express();

app.use(express.static(__dirname + "/public"));

app.get('/test', function(req, res) {
	res.json({"foo": "bar"});
});

app.listen(8888);
