/*jshintrc es6*/

// decimal to binary function
function decToBin(n) {
    var rem = n%2;
    var resultArr=[rem];
    var q = (n-rem)/2;
    while ( q>=1 ) {
        rem = q%2;
        q = (q - rem)/2;
        resultArr.push(rem);
    }
    var bin = "";
    for (var i=resultArr.length-1; i>=0; i--) { bin += resultArr[i]; }
    console.log(bin);
}

decToBin(18);
decToBin(10);
decToBin(21);
decToBin(17);
