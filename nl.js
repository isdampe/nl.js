#!/usr/bin/env node
/*
 * nl.js
 * Launch everything required for your project in one command,
 * because the development business is ever so complicated.
 *
 * Author: http://github.com/isdampe
 * License: http://opensource.org/licenses/MIT
*/

//Basic requirements.
var fs = require("fs");
var childProcess = require("child_process");

//Declare some would be constants.
var nlCwd = process.env.PWD; //Dropped __dirname to ensure symlinks are followed.
var nlFile = "nl.json";

//Check for a specific nl.json file, or init process.
if ( process.argv.length > 2 ) {

  var arg = process.argv.slice(2);
  if ( arg[0] === "init" ) {

    var initJson = {
      "config": {
        "bin": "/usr/bin"
      },
      "apps": {
        "gnome-terminal": " --working-directory " + nlCwd
      }
    };

    var jsonString = JSON.stringify( initJson, undefined, 2 );

    //Write the file.
    fs.writeFileSync( "nl.json", jsonString );
    console.log( "Wrote nl.json file to " + nlCwd + "/" + nlFile );
    process.exit(0);
  } else {
    nlFile = arg[0];
  }

}

//Apply the nlUri for later use.
var nlUri = nlCwd + "/" + nlFile;

//Check if our JSON exists.
if (! fs.existsSync( nlUri ) ) {
  console.log( nlUri + " doesn't exist." );
  process.exit(1);
}

//Read the nl.json file to a buffer.
var nlBuffer = fs.readFileSync( nlUri, "utf-8" );

//Check if the buffer object is valid JSON.
try {
  var nlConfig = JSON.parse( nlBuffer );
} catch(e) {
  console.log( e );
  console.log( "Your nl.json file is invalid. Rectify the JSON errors and try again." );
  process.exit( 1 );
}

//Ensure we have all required properties.
if ( typeof nlConfig.config === "undefined" || typeof nlConfig.apps === "undefined" ) {
  console.log( "Invalid nl.json structure. Missing config{} or apps{} property." );
  process.exit( 1 );
}

//Declare an array to store app info in.
var nlApps = {};

//Go ahead and launch the apps.
for ( var app in nlConfig.apps ) {

  var appBin = app;
  var appArg = nlConfig.apps[app];
  var nlAppString = null;

  if ( app[0] === "/" ) {
    //Own path provided for process.
    nlAppString = appBin + " " + appArg;
  } else {
    nlAppString = nlConfig.config.bin + "/" + appBin + " " + appArg;
  }

  nlApps[app] = nlLaunchApp( nlAppString, app );

}

/* Launches a child process as specified in nl.json */
function nlLaunchApp( launchString, appName ) {

  console.log( "Launching " + appBin );
  var procBuffer = childProcess.exec( launchString, function( err, stdout, stderr ) {
    if ( err ) {
      console.log( "Error with process " + appName + ", " + err );
    }
  } );

  procBuffer.on( "exit", function ( code ) {
    console.log( "App " + appName + " exited with code " + code );
  });

}
