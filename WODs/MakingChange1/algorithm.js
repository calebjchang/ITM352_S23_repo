console.log("Calculating your change now!");

//initial value amount
var amount = 288;

//coins value
var quarters = 25;
var dimes = 10;
var nickels = 5;
var pennies = 1;

// var # of coins
//quarters
var num_quarters = parseInt(amount / quarters);
var amount2 = amount % quarters;
//dimes
var num_dimes = parseInt(amount2 / dimes);
var amount3 = amount2 % dimes;
//nickels
var num_nickels = parseInt(amount3 / nickels);
var amount4 = amount3 % nickels;
//pennies
var num_pennies = amount4;

//print my results
console.log(`Quarters: ${num_quarters}`);
console.log(`Dimes: ${num_dimes}`);
console.log(`Nickels: ${num_nickels}`);
console.log(`Pennies ${num_pennies}`);