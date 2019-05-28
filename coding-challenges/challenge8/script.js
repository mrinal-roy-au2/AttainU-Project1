$(document).ready(function(){
    $("button").click(function() {
        $('table').remove();
        var inputLang = $("#language").val();
        $.ajax({
            url: "bookdata.json",
            // url: "https://raw.githubusercontent.com/attainu-falcon/attainu-falcon/master/coding-challenges/data/books.json",
            datatype: "json",
            success: function(bookdata) {
                // var inputjson = JSON.parse(inputdata);
                var bookarray = [];
                for (var i=0; i<bookdata.length; i++) {
                    if (bookdata[i].language.indexOf(inputLang) != -1) {
                        bookarray.push(bookdata[i]);
                    }
                }
                printInTable(bookarray);
                function printInTable(bookarray) {
                    $('body').append('<table><tr><th>Title</th><th>Author</th><th>Country</th><th>Language</th><th>Link</th><th>Pages</th><th>Year</th></tr></table>');
                    $('table').addClass("table-container table table-striped");
                    for (var i=0; i<bookarray.length; ++i) {
                        $('table').append('<tr><td>'+bookarray[i].title+'</td><td>'+bookarray[i].author+'</td><td>'+bookarray[i].country+'</td><td>'+bookarray[i].language+'</td><td>'+bookarray[i].link+'</td><td>'+bookarray[i].pages+'</td><td>'+bookarray[i].year+'</td></tr>');
                            }
                        }
                    },
            statusCode: {
                204: function() {
                    alert("Book Not Found");
                    }
            }
        });
    });
});
