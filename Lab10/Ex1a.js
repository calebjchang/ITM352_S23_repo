month = "September";
day = 13;
year = 2003;

step1 = 03;
step2 = parseInt(step1/4);
step3 = step1 + step2; // 3
step4 = 5; //Not Jan so look at month before on table
step6 = step4 + step3; // 3
step7 = day + step6; //21
step8 = step7 - 1; //20
final = step8%7; //6


console.log(final);
