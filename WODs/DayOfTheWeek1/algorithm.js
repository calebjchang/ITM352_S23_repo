//sample date (saturday)
var day = 13;
var month = 'September';
var year = 2003;
outputyear = year

//monthkey object
monthkey = {
    January : 0,
    February : 3,
    March : 2,
    April : 5,
    May : 0,
    June: 3,
    July : 5,
    August : 1,
    September : 4,
    October : 6,
    November : 2,
    December : 4,
};

//days of the week array
day_of_week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

//step1 
if (month == 'January' || month == 'February') {
    year = year - 1;
};

//step 2 --
year_div4 = year + parseInt(year / 4);
year_div100 = year_div4 - parseInt(year / 100);
year_div400 = year_div100 + parseInt(year / 400);
var final = (day + year_div400 + monthkey[month]) % 7;

console.log(month + " " + day + ", " + outputyear);
console.log("is a " + day_of_week[final]);