var login = document.querySelector("button")
login.addEventListener('click', inputCheck);


// Username or password cannot be blank,
// Username cannot be less than 5 characters,
//Password cannot be less than 8 characters,

function inputCheck() {
    var user = document.getElementById('username').value;
    var code = document.getElementById('password').value;
    var reason1 = (user === "");
    var reason2 = (code === "");
    var reason3 = !(user.length >= 5);
    var reason4 = !(code.length >= 8);
    if ((user === "") || (code === "")) {
        if (reason1){
            alert("Username cannot be blank. Please try again !");
        } else alert("Password cannot be blank. Please try again !");
    }else if (!(user.length >= 5) || !(code.length >= 8)) {
            if (reason3) {
                alert("Please Retry. Username should be atleast 5 character.");
            } else alert("Please Retry. Password should be atleast 8 character.");
        } else if (alphaNumCheck(user)) {
            if (userNameStartCheck(user)) {
                user = user.toLowerCase();      //Username should be case-insensitive (changes all cases to lower case)
                alert("Username and Password are valid");
            } else alert("Username should not start with \'0-9\', \'_\'. Please Retry!");
        } else alert("Username may be combination \'a-z\', \'A-Z\', \'0-9\', \'_\'. Please Retry!");
    document.getElementById('username').value = "";   //Username reset to blank
    document.getElementById('password').value = "";   //Password reset to blank
    }



//Username check function for alphabets, digits and _
function alphaNumCheck(user) {
    var checkNum = true;
    for (var i=0; i<user.length; i++) {
        var c = user.charCodeAt(i);
        if (!((c>=48 && c<=57) || (c>=97 && c<=122) || (c>=65 && c<=90) || (c===95))) {
            var checkNum = false;
        } else continue;
    } return checkNum;
}

//Username check function to not allow start with a digit
function userNameStartCheck(user) {
    var checkStart = true;
    if (user.charCodeAt(0)>=48 && user.charCodeAt(0)<=57) {
        checkStart = false;
    } return checkStart;
}
