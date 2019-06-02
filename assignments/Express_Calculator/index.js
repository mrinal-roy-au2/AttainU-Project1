var express = require('express');
var app = express();

app.get('/:operation', function(req, res){
    var num1 = parseInt(req.query.num1);
    var num2 = parseInt(req.query.num2);

//Below commented 3 lines is the code for request parameter object (all other remains same)
// app.get('/:operation/:num1/:num2', function(req, res){
    //  var num1 = parseInt(req.params.num1);
    //  var num2 = parseInt(req.params.num2);
    var result;
    switch (req.params.operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'sub':
            result = num1 - num2;
            break;
        case 'mul':
            result = num1 * num2;
        break;
        case 'div':
            result = num1 / num2;
            break;
        default:
            result = "Operation Not Allowed";
    }
    if (result === "Operation Not Allowed") {
        res.status(405).json({error:result});
    } else res.json({"First Number":num1, "Second Number":num2, "Result":result});
});


app.listen(8080);
