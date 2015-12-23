var fs = require('fs');
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

        // if a word was found in the db
        if (word) {
            console.log("word load from cache");
            res.json(word);
        } else {
            console.log("word load from jeuxdemots");
            var url = 'http://www.jeuxdemots.org/rezo-xml.php?gotermsubmit=Chercher&output=onlyxml&gotermrel=' + word_mot;
            request(url, function (error, response, body) {
                var temp = body.split("<CODE>");

                if(temp.length < 2) {
                    res.end();
                } else {
                    var temp2 = temp[1].split("</CODE>");
                    var result = temp2[0];
                    parser.parseString(result, function (err, result) {

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
