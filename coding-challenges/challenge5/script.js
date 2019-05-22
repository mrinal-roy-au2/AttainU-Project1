function printPattern(arg) {
    var output;
    for (var i=1; i<=5; i++) {
        output = "";
        for (var j=1; j<=i; j++) {
            output += arg;
        } console.log(output);
    }
    for (var i=4; i>=1; i--) {
        output = "";
        for (var j=1; j<=i; j++) {
            output += arg;
        } console.log(output);
    }
    }

printPattern('*');
