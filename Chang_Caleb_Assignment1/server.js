// Created by Caleb Chang
// Server.js used to validate data inputted in the webstore, and path to either an error message on the same page or redirect to the invoice page

// Declare/get query string as qs to be used later, load product data and express
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

// Created function used to check input in the textbox and add an error message below in real time.
// Used assistance from ChatGPT to tweak the below function from Lab 12 (lines 23 - 41) to dynamically change my error message, as well as match IR3's criteria (red border color, error msg, & replacing input value to the qty_available)
function checkQuantityTextbox(qtyTextbox) {
   const qtyAva = parseInt(qtyTextbox.dataset.qtyAva); // Get available quantity from dataset
   const qty = parseInt(qtyTextbox.value); // Get entered quantity
   const errorSpan = document.getElementById(qtyTextbox.id + "_errors");
   // Check if entered quantity exceeds available quantity
   if (qty > qtyAva) { 
    // Changes the error message to the following
     errorSpan.innerHTML = `We don't have ${qty} available`;
     // Sets textbox value to available quantity
     qtyTextbox.value = qtyAva; 
     // Changes textbox border color to red when value is > qtyAva
     qtyTextbox.style.borderColor = "red"; 
   } 
   // Clears error message and changes border color back to default
   else { 
     errorSpan.innerHTML = "";
     qtyTextbox.style.borderColor = "";
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

// Below code (lines 67 - 103) based on Branson Suzuki's (F22) server.js 
// Declaring q as a empty variable, setting the has_quantity default to false (eg. quantities haven't been entered yet), and an empty errors object.
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
// Checking stock validity, (created pre - IR3 code, as the IR3 code blocks the user from sending in a quantity larger than the qty_available, but still functions properly)
   if (q > products[i].qty_ava) {  
       errors['stock_outage' + i ] = `We currently don't have ${(q)} ${products[i].name}s. Please check back later!`
   }
}
}
// Prints an error telling the user to select an item to purchase; when the user hasn't input any values.
if(has_quantity == false) {
errors['no_selections_error'] = "Please select some items to purchase!";
}
// If all selected quantities are valid, and at least one selection is made without errors, redirect to the invoice.html file, and in all other cases it will stay on the store page.
if (Object.keys(errors).length == 0) {
// If the selected quantities are valid, it will take the quantity purchased out of the quantity available.
for(let i in products){
   products[i].qty_ava -= Number(request.body['quantity' + i]);
}
response.redirect("./invoice.html?" + qs.stringify(request.body));
} else {
response.redirect("./products_display.html?" +  qs.stringify(request.body) + '&' + qs.stringify(errors));
}
});


// route all other GET requests to files in public 
app.use(express.static(__dirname + '/public'));

// start server
app.listen(8080, () => console.log(`listening on port 8080`));