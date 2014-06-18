//Created by Raditya Budianto

// Use the OAuth module
var OAuth = require('oauth').OAuth;
var oauth = require('oauth');
var parseString = require('xml2js').parseString;
// Setup key/secret for authentication and API endpoint URL
var configuration = {
   api_url: "https://api.tradeking.com/v1/accounts/xxxxxxxx/orders.xml",
	consumer_key: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    consumer_secret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    access_token: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    access_secret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
	
}	
	
// Login


// Setup the OAuth Consumer
var tradeking_consumer = new oauth.OAuth(
  "https://developers.tradeking.com/oauth/request_token",
  "https://developers.tradeking.com/oauth/access_token",
  credentials.consumer_key,
  credentials.consumer_secret,
  "1.0",
  "http://mywebsite.com/tradeking/callback",
  "HMAC-SHA1");

var account_data,splitAccount;
  
// Make a request to the API endpoint
// Manually update the access token/secret as parameters.  Typically this would be done through an OAuth callback when 
// authenticating other users.
tradeking_consumer.get(credentials.api_url+'/accounts.json', credentials.access_token, credentials.access_secret,
  function(error, data, response) {
    // Parse the JSON data
    account_data = JSON.parse(data);
    // Display the response
    splitAccount=JSON.stringify(account_data.response)
	splitAccount=String(splitAccount).split(/{|:|"/);
	console.log(splitAccount);
	console.log(splitAccount[2]+":"+splitAccount[5]+":"+splitAccount[6]+":"+splitAccount[7]);
	console.log(splitAccount[9]+":"+splitAccount[12]);
	console.log(splitAccount[14]);
	console.log("	"+splitAccount[18]+":");
	console.log("		"+splitAccount[22]+"->"+splitAccount[25]);
	console.log("		"+splitAccount[36]+"="+splitAccount[39]);
	console.log("		"+splitAccount[41]+"="+splitAccount[44]);
	console.log("		"+splitAccount[46]+"="+splitAccount[49]);
	console.log("		"+splitAccount[51]+"="+splitAccount[54]);
	console.log("		"+splitAccount[56]+"="+splitAccount[59]);
	console.log("	");
	console.log("	"+splitAccount[61]+":")
	console.log("		"+splitAccount[65]+"="+splitAccount[68]);
	console.log("		"+splitAccount[70]+"="+splitAccount[73]);
	console.log("		"+splitAccount[75]+"="+splitAccount[78]);
	console.log("		"+splitAccount[80]+"="+splitAccount[83]);
	console.log("		"+splitAccount[85]+"="+splitAccount[88]);
	console.log("		"+splitAccount[90]+"="+splitAccount[93]);
	console.log("		"+splitAccount[95]+"="+splitAccount[98]);
	console.log("		"+splitAccount[100]+"="+splitAccount[103]);
	console.log("		"+splitAccount[105]+"="+splitAccount[108]);
	console.log("	");
	console.log("	"+splitAccount[110]+":");
	console.log("		"+splitAccount[114]+"="+splitAccount[117]);
	console.log("		"+splitAccount[119]+"="+splitAccount[122]);
	console.log("		"+splitAccount[124]+"="+splitAccount[127]);
	console.log("		"+splitAccount[129]+"="+splitAccount[132]);
	console.log("		"+splitAccount[134]+"="+splitAccount[137]);
	console.log("		"+splitAccount[139]+"="+splitAccount[142]);
	console.log("  		"+splitAccount[144]+" security ="+splitAccount[147]);
	console.log("	");
	console.log("	");
	console.log("  "+splitAccount[149]+"::"+splitAccount[153]);
	console.log("	");
	console.log(" 	 "+splitAccount[157]+"="+splitAccount[160]);
	console.log(" 	 "+"#"+splitAccount[162]+"="+splitAccount[165]);
	//console.log(splitAccount[0]+splitAccount[1]+splitAccount[2]+splitAccount[3]+splitAccount[4]+splitAccount[5]+splitAccount[6]);
  }
);

  
/**************************************************************************************


	Stream!!!


****************************************************************************************/

var oa = new OAuth(null, null, credentials.consumer_key, credentials.consumer_secret, "1.0", null, "HMAC-SHA1");
	var request = oa.get("https://stream.tradeking.com/v1/market/quotes?symbols=ggp", 
	credentials.access_token, 
	credentials.access_secret);

  
  
//Store streamed Var
	var i;
	var store;
	var storeInt=new Array();
	var ask,askQuantity;
	var bid,bidQuantity;
	
//Stream data
	request.on('response', function (response) {
	    response.setEncoding('utf8');
    	response.on('data', function(data) {

			//Convert streaming data to JSON
			parseString(data, function (err, result) {
				var convert=JSON.stringify(result);

			
				//split condition Don't Forget !!!
				store=(convert.split(/:|,|[|]|"/));
				
				//get ask price & volume
				ask=parseFloat(store[7]);
				bid=parseFloat(store[19]);
			
				//Display Bid and Ask + those volume
				if(String(store[4])!='cvol'){
				console.log("");
				console.log("");
				console.log("");
				console.log("-------------------------------------------------------");
				console.log("			 "+"Symbol="+store[44]);
				console.log("			 "+store[4]+"="+parseFloat(store[7])+"	Ask.Q="+store[13]);
				console.log("			 "+store[16]+"="+store[19]+"	Bid.Q="+store[25]);
				console.log("--------------------------------------------------------");
				console.log("");
				console.log("");
				console.log("");
				}
				else
				{
				console.log("Cumulative Volume"+"="+parseFloat(store[7])+"		Date & Time"+"="+store[13]+store[14]+store[15]);
				}
			});//end parseString
		})//end response.on
	});//endrequest.on 
	
request.end();

