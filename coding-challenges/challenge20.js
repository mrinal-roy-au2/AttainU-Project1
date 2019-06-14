function checkPan(input) {
input = input.toLowerCase();
var isThere;
console.log(input);
var missing = [];
const alpha = "abcdefghijklmnopqrstuvwxyz";
for (var i=0; i<alpha.length; i++){
isThere = false;
for (var j=0; j<input.length; j++){
if (input.charAt(j) != " ") {
if (alpha.charAt(i) === input.charAt(j)) {
isThere = true;
}
}
} // closing braces with 'for' loop with var j
if (!isThere) {
missing.push(alpha.charAt(i)); }

} //closing braces with 'for' loop with var i

if (missing.length != 0) {
console.log("NOT A PANGRAM"); } else {
console.log("PANGRAM"); }
}

checkPan("The quick brown fox jumps");
checkPan("Pack my box with five dozen liquor jugs");
