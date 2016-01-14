var Iconv = require('iconv').Iconv;
var request = require('request');
var xml2js = require('xml2js');
var Word = require('../models/word');

var parser = new xml2js.Parser();

exports.getWord = function(req, res) {

    var word_mot = req.params.word_id;

    // use the Word model to find a specific word
    Word.findOne({mot: word_mot}, function(err, word) {
        if (err)
            console.log(err);

        if (word) {
            // word from database
            console.log("word load from cache");
            res.json(word);
        } else {
            // word from jeuxdemots
            console.log("word load from jeuxdemots");

            // url to request a word
            var url = 'http://www.jeuxdemots.org/rezo-xml.php?gotermsubmit=Chercher&output=onlyxml&gotermrel=' + word_mot;

            // request with no encoding so the result is a buffer
            request({uri : url, encoding :  null}, function (error, response, body) {
                // convert from iso-8859-1 to utf-8
                var iconv = new Iconv('iso-8859-1', 'utf-8');
                var buffDecode = iconv.convert(body);
                var stringDecode = buffDecode.toString('utf-8');

                // retrieve the content between the code markup
                var temp = stringDecode.split("<CODE>");
                // if there is no code markup
                if(temp.length < 2) {
                    res.end();
                } else {
                    var temp2 = temp[1].split("</CODE>");
                    var xmlToParse =  temp2[0];

                    // parse xml to json
                    parser.parseString(xmlToParse, function (err, result) {
                        if (err) {
                            console.log(err);
                            return;
                        }

            			// json cleanup
            			var JSONdata = result.jdm;
                        JSONcleanUp(JSONdata);

                        // create the word
                        var word = new Word(JSONdata);

                        // persist the word
                        word.save(function (err) {
                            if (err)
                                console.log(err);
                        });

            			// send the word
            	        res.json(word);
            	    });
                }
            });
        }
    });
};

// clean the json created with the xml
function JSONcleanUp(JSONdata) {
    JSONdata.entrant = JSONdata.entrant[0].rel;
    JSONdata.sortant = JSONdata.sortant[0].rel;
    JSONdata.mot = JSONdata.mot[0]._;
    JSONdata.def = JSONdata.def[0]._;
    JSONdata.motformate = JSONdata['mot-formate'][0];
    delete JSONdata['mot-formate'];

    var cleanArray = function(element, index, array) {
        element.association = element.$;
        element.mot = element._;
        delete element.$;
        delete element._;
    }

    JSONdata.entrant.forEach(cleanArray);
    JSONdata.sortant.forEach(cleanArray);
}
