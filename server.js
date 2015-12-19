var express = require('express');
var fs = require('fs');
var xml2js = require('xml2js');
var app = express();

app.use(express.static(__dirname + "/public"));

var parser = new xml2js.Parser();
app.get('/test', function(req, res) {
	fs.readFile(__dirname + '/chat2.xml', function(err, data) {
	    parser.parseString(data, function (err, result) {
			// mettre au propre le json
			var JSONdata = result.jdm;
			JSONdata.entrant = JSONdata.entrant[0].rel;
			JSONdata.sortant = JSONdata.sortant[0].rel;
			JSONdata.mot = JSONdata.mot[0]._;
			JSONdata.def = JSONdata.def[0]._;
			JSONdata.motformate = JSONdata['mot-formate'][0];
			delete JSONdata['mot-formate'];

			// envoie du json
	        res.end(JSON.stringify(JSONdata));
	        console.log('Done');
	    });
	});
});

app.listen(8888);
