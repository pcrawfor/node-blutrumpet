/*!
 * node-blutrumpet
 * 
 * 
 * Copyright (c) 2012 Paul Crawford <paul@cometcoast.com>
 * MIT Licensed
 */

/*
  Module Dependencies
*/

var EventEmitter = require('events').EventEmitter
  , queryString = require('querystring')
  , request = require('request');

exports = module.exports = Blutrumpet;

/*
  Blutrumpet Constants
*/

/*
  Full blutrumpet tracking url
  https://tracker.blutrumpet.com/conversion?app_guid={GUID}&udid={Unique Device Identifier}
*/
Blutrumpet.TEST_API_URL = "https://testtracker.blutrumpet.com/conversion";
Blutrumpet.API_URL = "https://tracker.blutrumpet.com/conversion";

/* 
  Library version.
*/
exports.version = '0.0.1';

/*  
  Constructor
*/

function Blutrumpet(options) {
  if (!options) options = {};
  this.guid = options.guid;
}

/* 
  Inherit from EventEmitter
*/

Blutrumpet.prototype.__proto__ = EventEmitter.prototype;


/*
---------------------
  Conversion Handling
---------------------
*/

/* 
  Send iOS Conversion
*/

Blutrumpet.prototype.sendiOSConversion = function(options, cb) {
  var self = this;
  var params = {};
  var url;

  params["app_guid"] = self.guid;
  params["udid"] = options.udid  
    
  url = self.buildURL(params);

  return request.get(url, function(error, response, body) {        
    if (error) {

      console.log("error: " + error);
      cb(error, null);
      return this.emit('failure', error);

    } else if (response.statusCode !== 200) {

      console.log("Status code: " + response.statusCode + " response body: " + body);
      cb(null, response);
      return this.emit('failure', response);

    } else if (response.statusCode === 200) {
      
      console.log("Conversion submitted.");
      cb(null, response);
      return this.emit('success', response);

    }
  });
};

/*
  buildURL
  Create the parameterized url for conversion submission
*/

Blutrumpet.prototype.buildURL = function(options) {
  var queryParams = queryString.encode(options);
  return "" + Blutrumpet.API_URL + "?" + queryParams;
};

var bt = new Blutrumpet({guid: "your-guid-here"});
bt.sendiOSConversion({udid: "device-uid-here"}, function(err, response){
  if(err) {
    console.log("Error: " + err);
  } else {
    console.log("Response: " + response.statusCode);
  }
});
