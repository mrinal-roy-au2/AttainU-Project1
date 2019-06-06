// below function does not use fromCharCode built-in string method
function nextLetterFuncWithoutBuiltIn(word) {
    var new_word = "";
    var alpha = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    for (var i=0; i<word.length; ++i) {
        if (word.charAt(i) === "z") {
            new_word += "a";
        } else {
            var n = alpha.indexOf(word.charAt(i));
            new_word += alpha[n+1];
        }
    }
    console.log("Input: "+ word);
    console.log("Output: "+ new_word);
}


nextLetterFuncWithoutBuiltIn("hello");
nextLetterFuncWithoutBuiltIn("zeta");
