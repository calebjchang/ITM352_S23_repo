var express = require('express');
var app = express();

// Load my Product Data
var products = require(__dirname + '/products.json');
console.log(products);

// non neg function
function isNonNegInt(q, returnErrors=false) {

    errors = [];
    
    if(Number(q) != q) errors.push('Not a number!');
    
    if(q < 0) errors.push('Negative value!');
    
    if(parseInt(q) != q) errors.push('Not an integer!');
    
    return (returnErrors ? errors : (errors.length == 0));
    
    };

//middleware
app.use(express.urlencoded({ extended: true }));

//ex4 micro service, ask for product_data.js, getting it from the json
app.get("/product_data.js", function (request, response, next) {
    response.type('.js');
    var products_str = `var products = ${JSON.stringify(products)};`;
    response.send(products_str);
 }); 

//add below to assignment one (prints to console)
app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path + ' with qs ' + JSON.stringify(request.query));
    next();
});

app.post('/process_purchase', function (request, response, next) {
    //this is how you get the data from your textboxes 
    console.log(request.body);
    // validate quantities, most likely need to loop for assign1
    // use q = to turn a large thing into a small var for computations and such
    var q = request.body['quantity_textbox'];

    var errors = isNonNegInt(q, true);

// check that they've chosen at least one selection
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
    //if valid, complete purchase go to invoice

    //if invalid, send errors and go back to order page
    response.send('POST to process_purchase');
});

app.use(express.static(__dirname + '/public'));
app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here to do a callback
