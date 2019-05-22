function printPattern(arg) {
    var output;
    count = 1;
    for (var i=1; i<=5; i++) {
        output = "";
        for (var j=1; j<=i; j++) {
            output += arg;
        } console.log(output);
        count++;
    } if (count>5) {
        for (var i=5; i<5; i--) {
            output = "";
            for (var j=1; j<=i; j++) {
                output += arg;
            } console.log(output);
        }
    }
    }





printPattern('A');
