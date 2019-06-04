
checkPalindrome("kayak");
checkPalindrome("madam");
checkPalindrome("Malayalam");
checkPalindrome("abracadabra");

function checkPalindrome(input_word){
    var word = input_word;
    input_word = input_word.toLowerCase();
    if (input_word.length%2 != 0) {
        var check_length = (input_word.length - 1)/2;
        var palindome;
        for (i=0; i<=check_length; ++i) {
            if (input_word.charAt(i) === input_word.charAt(input_word.length-1-i)) {
                palindrome = true;
            } else { palindrome = false; break; }
        }
        if (palindrome) {
            console.log("The word "+word+ " IS A PALINDROME.");
        } else { console.log("The word "+word+ " IS NOT A PALINDROME.");}
    } else { console.log("The word "+word+ " IS NOT A PALINDROME.");}
}
