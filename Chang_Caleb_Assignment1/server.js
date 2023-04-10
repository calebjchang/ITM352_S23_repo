//Based upon Branson Suzuki's (F22) server.js

// Declare/get query string, load product data and express
const qs = require('node:querystring');
var products = require(__dirname + '/products.json');
console.log(products);
const { query } = require('express');
var express = require('express');
var app = express();

// Non Negative Integer function, used later to determine validity, (If q is "")
function isNonNegInt(q, returnErrors=false) {
   errors = [];
   if(Number(q) != q) errors.push('Not a number!');
   if(q < 0) errors.push('Negative value!');
   if(parseInt(q) != q) errors.push('Not an integer!');
   return (returnErrors ? errors : (errors.length == 0));
   };

// Determines the value in textbox, used to dynamically update the html on the page 

// Used ChatGPT to tweak the function to dynamically change properly
function checkQuantityTextbox(qtyTextbox) {
   const qtyAva = parseInt(qtyTextbox.dataset.qtyAva); // Get available quantity from dataset
   const qty = parseInt(qtyTextbox.value); // Get entered quantity
   const errorSpan = document.getElementById(qtyTextbox.id + "_errors");
   if (qty > qtyAva) { // Check if entered quantity exceeds available quantity
     errorSpan.innerHTML = `We don't have ${qty} available`;
     qtyTextbox.value = qtyAva; // Set textbox value to available quantity
   } else { // Clear error message if quantity is valid
     errorSpan.innerHTML = "";
   }
};

// Middleware from Lab12
app.use(express.urlencoded({ extended: true }));

// Monitor all requests
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

// Using isNonNegInt to validate my quantities
   var q
   var has_quantity = false;
   var errors = {};

for (let i in products) {
   q = request.body['quantity' + i];
   if (typeof q != 'undefined') {
   console.log(q);
   // Check that there were quantities inputted
   if(q > 0) {
      has_quantity = true;
      
   }
   // Using isNonNegInt to validate values
   if(isNonNegInt(q) == false) {
       errors['quantity_error'+i] = isNonNegInt(q,true);
   }
// IR3 & Checking stock validity 
   if (q > products[i].qty_ava) {  
       errors['stock_outage' + i ] = `We currently don't have ${(q)} ${products[i].name}s. Please check back later!`
   }
}
}
// This code is to print out an error stating that the user needs to select quantites instead of leaving it blank
if(has_quantity == false) {
errors['no_selections_error'] = "Please select some items to purchase!";
}
// This code is for when there are no errors and will move the user on towards the invoice.html file I have instead of directing them back to products display (like when we do have an error)
if (Object.keys(errors).length == 0) {
//If quantities are valid, remove quantities from the quantity available.
for(let i in products){
   products[i].qty_ava -= Number(request.body['quantity' + i]);
}
response.redirect("./invoice.html?" + qs.stringify(request.body));
} else {
response.redirect("./products_display.html?" +  qs.stringify(request.body) + '&' + qs.stringify(errors));
}
});

// IR3:

// route all other GET requests to files in public 
app.use(express.static(__dirname + '/public'));

// start server
app.listen(8080, () => console.log(`listening on port 8080`));