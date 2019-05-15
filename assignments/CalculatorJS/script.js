document.querySelector("#add").addEventListener("click", function(){
    var num1 = document.getElementById("num1").value;
    var num2 = document.getElementById("num2").value;
    document.querySelector("#output").value = parseFloat(num1) + parseFloat(num2);
})

document.querySelector("#sub").addEventListener("click", function(){
    var num1 = document.getElementById("num1").value;
    var num2 = document.getElementById("num2").value;
    document.querySelector("#output").value = num1 - num2;
})

document.querySelector("#mul").addEventListener("click", function(){
    var num1 = document.getElementById("num1").value;
    var num2 = document.getElementById("num2").value;
    document.querySelector("#output").value = num1 * num2;
})

document.querySelector("#dvd").addEventListener("click", function(){
    var num1 = document.getElementById("num1").value;
    var num2 = document.getElementById("num2").value;
    document.querySelector("#output").value = num1 / num2;
})
