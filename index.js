var express = require('express');
var url = require('url');
var app = express();
var fs = require('fs');
var moment = require('moment');
var unix = null;
var natural = null;

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  fs.readFile('page/index.html',function(err,data){
  	if(err) throw err;
  	response.writeHeader(200, {"Content-Type": "text/html"});  
    response.write(data);  
    response.end();
  });
});

app.get('/:query',function(request,response){
	var query = request.params.query;
	console.log(query);

	if(query >= 0){
		unix = query;
		natural = unixtoNat(query);
	}

	if(isNaN(query) && moment(query, "MMMM DD, YYYY").isValid()){
		unix = nattoUnix(query);
		natural = unixtoNat(unix);
	}

	obj = {
		"unix" : unix,
		"natural" : natural
	}
	
	response.setHeader('Content-Type','application/json');
	response.send(JSON.stringify(obj));
});

	function nattoUnix(date){
		return moment(date, "MMMM DD, YYYY").format("X");
	}

	function unixtoNat(date){
		return moment.unix(date).format("MMMM DD, YYYY");
	}

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


