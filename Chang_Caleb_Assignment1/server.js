// Load in query string, product data, and express

var products = require(__dirname + '/products.json');
console.log(products);
var express = require('express');
var app = express();

// non neg int function, use later to determine validity, (If q is "")
function isNonNegInt(q, returnErrors=false) {
   errors = [];
   if(Number(q) != q) errors.push('Not a number!');
   if(q < 0) errors.push('Negative value!');
   if(parseInt(q) != q) errors.push('Not an integer!');
   return (returnErrors ? errors : (errors.length == 0));
   };

//middleware from Lab12, used to 
app.use(express.urlencoded({ extended: true }));

// Determine input in the textbox

// monitor all requests
app.all('*', function (request, response, next) {
   console.log(request.method + ' to ' + request.path);
   next();
});

// Routing 
app.get("/products.js", function(request, response, next)
        {
            response.type('.js');
            var products_str = `var products = ${JSON.stringify(products)};`;
            response.send(products_str);
        });

// process purchase request (validate quantities, check quantity available)
app.post('/purchase', function (request, response, next) {
   //Receive data from textboxes and log
   console.log(request.body);

// Using isNonNegInt to validate my quantities, setting vars to check
   var q
   var has_quantities = false;
   var errors = {};

for (let i in products) {
// check that they've chosen at least one selection
var q = request.body['quantity' + i];
 if (q > 0) {
       has_quantities = true;
       next;
   };

// If there are errors, send them back to the user and go back to the order page
   if (errors.length > 0) {
     response.send(`Error: ${q} is not a quantity. Hit the back button to fix..
     `);
     return;
   }
   else {
   response.send(`<b>Thank you for purchasing ${q} things!</b>`);
   } ;

   //if invalid, send errors and go back to order page
   response.send('POST to purchase');
}});

// IR3:

// route all other GET requests to files in public 
app.use(express.static(__dirname + '/public'));

// start server
app.listen(8080, () => console.log(`listening on port 8080`));