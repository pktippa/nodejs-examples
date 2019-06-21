var restler = require('restler');
restler.post("http://localhost:8080/postResponse", {
	data : {
		id : 1,
		name : "pktippa"
	},
	headers : {
		'Content-Type' : 'application/json'
	}
}).on('complete', function(data, response) {
	console.log("response data : " + JSON.stringify(data));
});
