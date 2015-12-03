var express = require('express');
var fs = require('fs');
var parser = require('xml2json');
var app = express();

app.use(express.static(__dirname + "/public"));

app.get('/test', function(req, res) {
	var readable = fs.createReadStream('chat.xml');
	readable.on('open', function() { readable.pipe(res); });
	readable.on('error', function() { res.end("[]"); });
});

app.listen(8888);
