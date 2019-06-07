/* jshint esversion: 6*/

function urlParamFinder(url) {
    var startIndexParam1, startIndexParam2;
    var flagNoParameter = true;
    for (var i=0; i<url.length; i++) {
        if ((url.charAt(i) === "?") || (url.charAt(i) === "&")) {
            flagNoParameter = false;
            if (url.charAt(i)==="?") {
                startIndexParam1 = i;
            }
            if (url.charAt(i)==="&") {
                startIndexParam2 = i;
            }
        }
    }
    if (flagNoParameter) {
        console.log("Missing URL parameters!");
    } else {
        parameter1= "";
        parameter2 = "";
        for (var j = startIndexParam1+1; j<startIndexParam2; j++) {
            parameter1 += url.charAt(j);
        }

        for (var k = startIndexParam2+1; k<url.length; k++) {
            parameter2 += url.charAt(k);
        }
        console.log(keyValueSplit(parameter1)+" , "+keyValueSplit(parameter2));
        }
    }

function keyValueSplit(input){    //function to split the parametric string
    var dividingIndex;
    for (var i=0; i<input.length; i++) {
        if(input.charAt(i) === "=") {
            dividingIndex = i;
        }
    }

    var key="";
    for (var j = 0; j<dividingIndex; j++) {
        key += input.charAt(j);
    }

    var value="";
    for (var k = dividingIndex+1; k<input.length; k++) {
        value += input.charAt(k);
    }

    var keyValuePair = key + ":" + value;
    return keyValuePair;
}



urlParamFinder("http://localhost:3000/add?num1=5&num2=3");
urlParamFinder("http://localhost:3000/search");
