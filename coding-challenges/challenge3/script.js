var arr1, arr2 = [];

arr1 = ["a", "b", "c", "g", "p", "q", "r"];
arr2 = ["g", "r", "p", "c", "a", "q", "b"];

arrEqCompare(arr1, arr2);

function arrEqCompare(arr1, arr2) {
    var Arr1 = arr1.sort();
    var Arr2 = arr2.sort();
    if (arr1.length === arr2.length) {
        var k = arr1.length;
        var eqArr = [];
        for (i=0; i<arr1.length; ++i) {
            for (j=0; i<arr2.length; ++j) {
                if (arr1[i] === arr2[j]) {
                    eqArr.push(1);
                } continue;
            }
        } if (eqArr.length === k) {
            result = "Arrays are Equal";
        } else result = "Arrays are Not Equal";
    } else result = "Arrays are Not Equal";
console.log(result);
}
