// FS stands for file system, load my file system interface
var fs = require('fs');
var filename = __dirname + "/user_data.json";

//read in user data
var user_data_obj_JSON = fs.readFileSync(filename, 'utf-8');

// get password for user kazman

// convert user data JSON into object
var user_data = JSON.parse(user_data_obj_JSON);

// log users_reg_data to get pw info for user kazman
var username = "kazman";
// use dots and [] to path to json objects 
console.log(`The password for user ${username} is ${user_data[username].password}.`);