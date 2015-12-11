var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static(__dirname + "/public"));

app.get('/test', function(req, res) {
	var readable = fs.createReadStream('chat.xml');
	var xml = '';
	readable.on('readable', function() {
	    while ((chunk=readable.read()) != null) {
	        xml += chunk;
	    }
	});
	readable.on('error', function() { res.end("[]"); });
});

app.listen(8888);
