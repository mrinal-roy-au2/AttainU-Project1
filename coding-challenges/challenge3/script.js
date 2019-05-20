var arr1, arr2 = [];
//Arrays have been assumed to be equal if their lengths are equal and
// their elements are same (equal). It is assumed that arrays may not be
// in same order and arrays are said to also equal if its lengths are equal
// elements are equal, but may not be in same order.

arr1 = ["a", "b", "c", "g", "p", "q", "r"];
arr2 = ["g", "r", "p", "c", "a", "q", "b"];

function arrEqCompare(array1, array2) {
    var arr1 = array1.sort();
    var arr2 = array2.sort();
    if (arr1.length === arr2.length) {
        var k = arr1.length;
        var eqArr = [];
        for (var i=0; i<arr1.length; ++i) {
                if (arr1[i] === arr2[i]) {
                    eqArr.push(1);
                } continue;
            }
        if (eqArr.length === k) {
            result = "Arrays are Equal";
        } else result = "Arrays are Not Equal";
    } else result = "Arrays are Not Equal";
console.log(result);
}

arrEqCompare(arr1, arr2);
