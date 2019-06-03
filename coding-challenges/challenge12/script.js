checkAnagram('binary', 'brainy'); //Should yield an Anagram
checkAnagram('listen', 'silent'); //Should yield an Anagram
checkAnagram('meat', 'meet'); //Not an Anagram, should yield Not Anagram
checkAnagram('Rail safety', 'Fairy tales');  //Should yield an Anagram

function checkAnagram(string1, string2) {
    var arr1 = string1.toLowerCase().split("");
    var arr2 = string2.toLowerCase().split("");
    if (arr1.length === arr2.length) {
        arr1 = arr1.sort();
        arr2 = arr2.sort();
        var anagram;
        for (var i=0; i<arr1.length; ++i){
            if (arr1[i] === arr2[i]) {
                anagram = true;
            } else { anagram = false; break; }
        }
        if (anagram) {
            console.log("The two strings are anagram");
        } else console.log("The two strings are not anagram");
    } else console.log("The two strings are not anagram");
}
