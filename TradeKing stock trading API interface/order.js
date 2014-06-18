//Created by Raditya Budianto

// Use the OAuth module
var OAuth = require('oauth').OAuth;

// Setup key/secret for authentication and API endpoint URL
var configuration = {
   api_url: "https://api.tradeking.com/v1/accounts/xxxxxxxx/orders.xml",
	consumer_key: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    consumer_secret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    access_token: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    access_secret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
	
}

var oa = new OAuth(null, null, credentials.consumer_key, credentials.consumer_secret, "1.0", null, "HMAC-SHA1");
var request = oa.get("https://api.tradeking.com/v1/accounts/60556275/orders.xml", 
credentials.access_token, 
credentials.access_secret);

request.on('response', function (response) {
    response.setEncoding('utf8');
    response.on('data', function(data) {
	

		
        console.log(data);
    })
});
request.end();