/*jshint esversion: 6*/

function fibonacci(n) {
    var seq = [1, 1];
    for (var i = 2; i < n; ++i) {
        seq.push(seq[i-1] + seq[i-2]);
    }
    console.log(seq);
}

fibonacci(7);
fibonacci(5);
fibonacci(9);
