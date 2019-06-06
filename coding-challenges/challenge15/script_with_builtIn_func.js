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
