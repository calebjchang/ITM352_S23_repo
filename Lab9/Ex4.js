//true or false, non negative integer checker, if false, errors are returned
      // pt2 step3 
      function ReturnStringNonNegInt(q) {
        errors = []; // assume no errors at first
        if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
        if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
        if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
        return (returnErrors ? errors : (errors.length == 0));
    };
function junk1() {
    for(i1=1; i1<=2; i1++){console.log(i1);}
    return `i1 is ${i1}`;
}


function junk2() {
    for(var i2=1; i2<=2; i2++){console.log(i2);}
    return `i2 is ${i2}`;
}

function junk3() {
    for(let i3=1; i3<=2; i3++){console.log(i3);}
    return `i3 is ${i3}`;
}

function checkIt(item, index) {
    console.log(`part ${index} is ${(isStringNonNegInt(item)?'a':'not a')} quantity`);
};

var attributes  =  "Caleb;19;19.5;18.5;MIS";
var pieces = attributes.split(';');

for (let part of pieces) {
console.log(
    part, ReturnStringNonNegInt (part)
)
console.log(`part ${index} is ${(isNonNegInt(item)?'a':'not a')} quantity`);
}; 
