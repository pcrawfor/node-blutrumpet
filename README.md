# Blutrumpet - Node.js Library for interacting with the Blutrumpet ad conversion API

Send conversions server to server to the blutrumpet servive.

To send iOS conversions pass the udid parameter, for android pass the udid and alt_udid parameters to the sendConversion function.

## Installation

Blutrumpet is available via npm

`npm install blutrumpet`

### Dependencies:

* request
* querystring

## Usage

    var bt = new Blutrumpet({guid: "your-guid-here"});
    bt.sendConversion({udid: "device-uid-here"});

    // with callbacks
    bt.sendConversion({udid: "device-uid-here"}, function(err, response){
      if(err) {
        console.log("Error: " + err);
      }

      // do something with response...
    });
