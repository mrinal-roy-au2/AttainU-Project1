/* jshint esversion: 6*/

function factorialOfNumber(n) {
    var result = 1;
    if (n<0) {
         result = "Only Positive Integer's Factorial can be found. Please try again.";
    } else if (n===0) { result = 1; }
        else {
            for (var i = 1; i <= n; i++) { result *= i; }
        }
    console.log(result);
}

factorialOfNumber(10);
factorialOfNumber(4);
factorialOfNumber(3);
factorialOfNumber(0);
factorialOfNumber(-3);
factorialOfNumber(3.5);
factorialOfNumber(4.5);
