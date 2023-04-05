var express = require('express');
var app = express();

var products = require(__dirname + '/products.json');
console.log(products);

//middleware
app.use(express.urlencoded({ extended: true }));

//ex4
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
    if (typeof q != 'undefined') {
    response.send(`Thank you for purchasing ${q} things!`);
    } 
    //if valid, complete purchase go to invoice

    //if invalid, send errors and go back to order page
    response.send('POST to process_purchase');
});

app.use(express.static(__dirname + '/public'));
app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here to do a callback
