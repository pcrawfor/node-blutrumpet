# Blutrumpet - Node.js Library for interacting with the Blutrumpet ad conversion API


## Installation

Blutrumpet is available via npm

`npm install blutrumpet`

### Dependencies:

* request
* querystring

## Usage

    var bt = new Blutrumpet({guid: "your-guid-here"});
    bt.sendiOSConversion({udid: "device-uid-here"});
