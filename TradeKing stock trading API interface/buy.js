//Created by Raditya Budianto



// Use the OAuth module
var oauth = require('oauth');
//var parseString = require('xml2js').parseString;

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

  
   body = ['<FIXML xmlns="http://www.fixprotocol.org/FIXML-5-0-SP2">',
				'<Order TmInForce="0" Typ="1" Side="1" Acct="60556275">',
					'<Instrmt SecTyp="CS" Sym="GGP"/>','<OrdQty Qty="123"/>',
				'</Order>',
		    '</FIXML>'].join();
  
  
// Make a request to the API endpoint
// Manually update the access token/secret as parameters.  Typically this would be done through an OAuth callback when 
// authenticating other users.
tradeking_consumer.post(configuration.api_url, configuration.access_token, configuration.access_secret, body,"application/xml",
  function(error, data, response) {
    // Parse the JSON data
 // account_data = JSON.parse(data);
    // Display the response
    console.log(data);
  }
);

//exports.OAuth.prototype.post= function(url, oauth_token, oauth_token_secret, post_body, post_content_type, callback)