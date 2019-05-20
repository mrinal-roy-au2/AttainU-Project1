var num1 = parseFloat(document.getElementById("num1").value);
var num2 = parseFloat(document.getElementById("num2").value);

document.querySelector("#add").addEventListener("click", calAdd(num1, num2));

document.querySelector("#sub").addEventListener("click", calSub(num1, num2));

document.querySelector("#mul").addEventListener("click", calMul(num1, num2));

document.querySelector("#dvd").addEventListener("click", calDvd(num1, num2));

function calAdd(num1, num2) {
    document.querySelector("#output").value = parseFloat(num1) + parseFloat(num2);
}

function calSub(num1, num2) {
    document.querySelector("#output").value = parseFloat(num1) - parseFloat(num2);
}

function calMul(num1, num2) {
    document.querySelector("#output").value = parseFloat(num1) * parseFloat(num2);
}

function calDvd(num1, num2) {
    document.querySelector("#output").value = parseFloat(num1) / parseFloat(num2);
}
