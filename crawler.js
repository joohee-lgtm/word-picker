'use strict';

var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('words.csv'),
    fs = require('fs');

var current = 0;
var MAX = 8;
var words = new Array();

lr.on('error', function (err) {
    console.log(err);
});

lr.on('line', function (line) {
    if(!Array.isArray(words[current])){
		words[current] = [];
    }

    words[current].push(line);
    current++;
    if(current >= MAX){
    	current = 0;
    }
});

lr.on('end', function () {
	for(var i=0; i<words.length ; i++){
		var n = i+1;
		var filename = "words"+n+".js";
		var data = "var aData"+ n + " = "+JSON.stringify(words[i]) + ";";
		fs.writeFile(filename, data, 'utf8');
	}
});