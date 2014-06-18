//Created by Raditya Budianto

// Use the OAuth module
var oauth = require('oauth');

// Setup key/secret for authentication and API endpoint URL
var configuration = {
   api_url: "https://api.tradeking.com/v1/accounts/xxxxxxxx/orders.xml",
	consumer_key: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    consumer_secret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    access_token: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    access_secret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
	
}

// Setup the OAuth Consumer
var tradeking_consumer = new oauth.OAuth(
  "https://developers.tradeking.com/oauth/request_token",
  "https://developers.tradeking.com/oauth/access_token",
  configuration.consumer_key,
  configuration.consumer_secret,
  "1.0",
  "http://mywebsite.com/tradeking/callback",
  "HMAC-SHA1");

// Make a request to the API endpoint
// Manually update the access token/secret as parameters.  Typically this would be done through an OAuth callback when 
// authenticating other users.
tradeking_consumer.get(configuration.api_url, configuration.access_token, configuration.access_secret,
  function(error, data, response) {
    // Parse the JSON data
  // account_data = JSON.parse(data);
    // Display the response
    console.log(data);
  }
);