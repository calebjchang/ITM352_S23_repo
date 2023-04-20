var express = require('express');
var app = express();

//EX2 code
// FS stands for file system, load my file system interface
var fs = require('fs');
var filename = __dirname + "/user_data.JSON";
// will look for file to load data
if (fs.existsSync(filename)) {
    var fsize = fs.statSync(filename).size;
    console.log(`user_data.json has ${fsize} characters`)
    // read in user data
    var user_data_obj_JSON = fs.readFileSync(filename, 'utf-8');
    // convert user data JSON to object
    var user_data = JSON.parse(user_data_obj_JSON);
    //get password for user kazman
    var username = "kazman";
    console.log(`The password for user ${username} is ${user_data[username].password}.`);
} else {
    console.log(`Hey I can't fine ${filename}!`)
};
// Making cookies
var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

// Route to set a cookie
app.get("/setcookie", function (request, response) {
    var myname = "Caleb";
    response.cookie(`users_name`, myname, {});
    response.send(`${myname} cookie sent!`);
});
//use cookie
app.get("/use_cookie", function (request, response) {
    var the_name = request.cookies['users_name'];
    response.send(`Welcome to the Use Cookie page ${the_name}!`)
});

// only need to add the /login routes for assignemnt2 (code can be found on ass2 module as well)
app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });
/* EX 3
app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(request.body);
    // Receive username
    var username = request.body.username
    // Receive password
    var password = request.body.password
    // Check username in database
    if (user_data.hasOwnProperty(username)) {
        // get users info
        var user_info = user.data[username];
        // check if password entered is password saved
        if (password == user_info[password]){
            response.send(`${username} logged in`)
        } else {
            response.send(`Invalid password!`)
        }
    } else {
        response.send(`${username} does not exist.`)
    }
}); */

app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    let login_username = request.body['username'] // check if username exists, then check password entered matches password stored
    let login_password = request.body['password']
    if (typeof user_data[login_username] != 'undefined') {
        if (user_data[login_username]["password"] == login_password) { // getting the stored password and matching against login_password
            response.send(`${login_username} is logged in`)
        } else {
            response.redirect(`./login?err=incorrect password for ${login_username}`);
        } 
    } else {
            response.send(`${login_username} does not exist`)
        }
    response.send('processing login' + JSON.stringify(request.body));
});


app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br/>
<input type="password" name="password" size="40" placeholder="enter password"><br/>
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br/>
<input type="email" name="email" size="40" placeholder="enter email"><br/>
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

 app.post('/process_register', function (request, response) {
   //add a new user to the DB
   username = request.body["uname"];
   user_data[username] = {};
   user_data[username]["name"] = request.body["name"];
   user_data[username]["password"] = request.body["psw"];
   user_data[username]["email"] = request.body["email"];
     //save updated user_data to file(DB)
   fs.writeFileSync(user_data_file, JSON.stringify(user_data));
   response.send(`${username} is registered`);
});


app.listen(8080, () => console.log(`listening on port 8080`));
