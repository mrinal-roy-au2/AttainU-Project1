/* jshint esversion: 6*/
//Below function uses fromCharCode built-in string function
function nextLetterFunc (word) {
    var new_word = "";
    for (var i=0; i<word.length; ++i) {
        if (word.charCodeAt(i)>=97 && word.charCodeAt(i)<122) {
            var letterCode = word.charCodeAt(i);
            new_word += String.fromCharCode(++letterCode);
        } else {
        new_word += "a";
        }
  }
  console.log("Input: "+ word);
  console.log("Output: "+ new_word);
}

nextLetterFunc("hello");
nextLetterFunc("zeta");


// below function does not use fromCharCode built-in string method
// function nextLetterFuncWithoutBuiltIn(word){
//     var new_word = "";
//     var alpha = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
//     for (var i=0; i<word.length; ++i) {
//
//
// }
