console.log("Loading loading loading...");

var attributes  =  "Caleb;19;19.5;18.5;MIS";
var pieces = attributes.split(';');
console.log(typeof pieces);

for (let part of pieces) {
console.log(
    part, typeof part,
)}; 

console.log(pieces.join(', '));