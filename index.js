const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

app.use(express.static('public'))

// Index route
app.get('/hello',function(req,res){
	console.log("Hello am running");
    res.send('Hello world, I am sailakshmi!.');
});

app.post('/emc2/', function (req, res) {
    console.log(JSON.stringify(req.body));
    var parameters=req.body.result.parameters;
	if ('agent' === req.body.result.source) {
		 req.get(
	   { 
	     url: "https://api.fixer.io/latest",
		qs: {
                    base: parameters.currency,
                    symbols: parameters.outputCurrency
                },
		 method: 'GET'
	   },
		
 function(error, res, body){ 
		  if (!error && res.statusCode == 200) { 
			  res.setHeader('Content-Type','application/json');
			   var outString = JSON.stringify(out);
			console.log('Out:' + outString);
			  res.send(JSON.parse(body)); 
		  }else{
			  res.send("Error !!!!!"+error);
		  } 
	   }); 
}
}
);

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'));
});