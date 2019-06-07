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
        console.log("Parameter1: "+parameter1+" Parameter2: "+parameter2);
        }

    }


urlParamFinder("http://localhost:3000/add?num1=5&num2=3");
urlParamFinder("http://localhost:3000/search");









// Input: "http://localhost:3000/add?num1=5&num2=3"
// Output: { "num1": 5, "num2": 3 }
//
// Input: "http://localhost:3000/search"
// Output: "Missing URL parameters!"
