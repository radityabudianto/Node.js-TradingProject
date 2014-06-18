//Created By Raditya Budianto
//Library for CoinBase API


var HotTap= require('hottap').hottap;
var fs=require('fs');
var $ = require('jquery');
var P=require('promise');

var api_key="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
var url="https://coinbase.com/api/v1/account/balance?api_key="+api_key;
var base_url = 'https://coinbase.com/api/v1/';




//get balance (in BTC and USD)
var balance=function(callback)
{   
        HotTap(url).request('GET', function(err, response) {
        var parseResponse= JSON.stringify(response);
        parseResponse=parseResponse.split("body");
        parseResponse=String(parseResponse[1]).split(/:|,|"/);
        parseResponse=String(parseResponse).split('\\');
        parseResponse=String(parseResponse[3]).split(',');
        callback(parseResponse[1]);
       
    });
    
}

//used as streaming bid and ask
var getSell = function(totalBTC,callback) {
    var urlx = base_url + 'prices/sell?qty=' +totalBTC;
    var sell;
    HotTap(urlx).request('GET', function(err, response) {
        var parseResponse= JSON.stringify(response);
        parseResponse=parseResponse.split("subtotal");
        parseResponse=String(parseResponse[1]).split(/:|,|"/);   
        parseResponse=String(parseResponse[6]).split('\\');
        sell=parseResponse[0];
      
        callback(sell);  
    
               
    });
}
//used as streaming sell and bid
var getBuy = function(totalBTC,callback) {
    var urlx = base_url + 'prices/buy?qty=' +totalBTC;
    var buy;
    HotTap(urlx).request('GET', function(err, response) {
        var parseResponse= JSON.stringify(response);
        parseResponse=parseResponse.split("subtotal");
        parseResponse=String(parseResponse[1]).split(/:|,|"/);   
        parseResponse=String(parseResponse[6]).split('\\');
        buy=parseResponse[0];
        
        callback(buy);
       
    
    });
}



//return +$ and -BTC
var postSell = function(amount, callback){
    var success;
    var totalCash
    var totalBTC;
    var postSellIndicator=[];
    
     HotTap("https://coinbase.com/api/v1/sells?api_key="+api_key+"&qty="+amount).request('POST', function(err, response) {
        var parseResponse= JSON.stringify(response);
        parseResponse=String(parseResponse).split('success');
        parseResponse=String(parseResponse[1]).split(/:|,|"/);   
        success=parseResponse[2]; 
        totalCash=String(parseResponse[116]).split('\\');
        totalBTC=String(parseResponse[86]).split('\\');;
        postSellIndicator[0]=success;
        postSellIndicator[1]=totalBTC[0];
        postSellIndicator[2]=totalCash[0];
        callback(postSellIndicator);               
        // console.log(postSellIndicator);
    });
}

//return +BTC and -$
var postBuy = function(amount,callback){
    var success;
    var totalCash
    var totalBTC;
    var postBuyIndicator=[];
    
     HotTap("https://coinbase.com/api/v1/buys?api_key="+api_key+"&qty="+amount).request('POST',function(err, response) {
        var parseResponse= JSON.stringify(response);
        parseResponse=String(parseResponse).split('success');
        parseResponse=String(parseResponse[1]).split(/:|,|"/);   
        success=parseResponse[2]; 
      
      //parsing position debugger 
      /*
       for(var i=0;i<parseResponse.length;i++)
       {
            totalCash=String(parseResponse[119+i]).split('\\');
            console.log(totalCash+'\n');
       }
       */
      
        totalCash=String(parseResponse[116]).split('\\');
        totalBTC=String(parseResponse[86]).split('\\');
        postBuyIndicator[0]=success;
        postBuyIndicator[1]=totalBTC[0];
        postBuyIndicator[2]=totalCash[0];
        callback(postBuyIndicator);            
        console.log(response);
    });
}



//Write System States
var writeLog=function(status, totalBTC, totalCash){
    var temp=[];
    fs.readFileSync('./log.txt').toString().split('\r\n').forEach(function (line) { 
        temp.push(line);
    });
    fs.writeFile("./log.txt", temp+status+' BTC='+totalBTC+' $'+totalCash+' '+new Date()+'\n'
    , function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("File log.txt had been saved!");
        }
    });
}
//Write System States Backup
var writeBackupLog=function(status, totalBTC, totalCash){
    var temp=[];
    fs.readFileSync('./Backuplog.txt').toString().split('\r\n').forEach(function (line) { 
        temp.push(line);
    });
    fs.writeFile("./Backuplog.txt", temp+status+' BTC='+totalBTC+' $'+totalCash+' '+new Date()+'\n'
    , function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("File Backuplog.txt had been saved!");
        }
    });
}
exports.balance=balance;
exports.getSell=getSell;
exports.getBuy=getBuy;
exports.postSell=postSell;
exports.postBuy=postBuy;
exports.writeIndicator=writeIndicator;
exports.loadIndicator=loadIndicator;
exports.writeLog=writeLog;
exports.writeBackupLog=writeBackupLog;
exports.writeBackupIndicator=writeBackupIndicator;

