
$("button").click(function(inputLang) {
    var inputLang = $("#language").val();
    $.ajax({
        url: "bookdata.json",
        // url: "https://raw.githubusercontent.com/attainu-falcon/attainu-falcon/master/coding-challenges/data/books.json";
        datatype: "json",
        success: function(bookdata) {
            // var inputjson = JSON.parse(inputdata);
            var bookarray = [];
            for (var i=0; i<bookdata.length; i++) {
                if (inputLang === bookdata[i].language) {
                    bookarray.push(bookdata[i]);
                }
            }
            console.log(bookarray);
        },
        statusCode: {
            404: function() {
            alert("File Not Found");
            }
        }
    });
});
