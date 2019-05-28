
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
                if (bookdata[i].language.indexOf(inputLang) != -1) {
                    bookarray.push(bookdata[i]);
                }
            }
            printInTable(bookarray);
            function printInTable(bookarray) {
                var table = document.createElement('table');
                document.querySelector('body').appendChild(table);
                $('table').addClass("table", "table-striped");
                for (var i=0; i<bookarray.length; ++i) {
                        var tableRows = document.createElement('tr');
                        table.appendChild(tableRows);
                        var headerValues = ['title', 'author', 'country', 'language', 'link', 'pages', 'year'];
                        for (var j=0; j<headerValues.length; ++j) {
                            if (i<1 && j<headerValues.length) {
                                    var header = document.createElement('th');
                                    header.appendChild(document.createTextNode(headerValues[j]));
                                    tableRows.appendChild(header);
                                } else {
                            var tableValues = document.createElement('td');
                            tableValues.appendChild(document.createTextNode(bookarray[i][headerValues[j]]));
                            tableRows.appendChild(tableValues);
                        }
                    }
                }
            }

            console.log(bookarray);
        },
        statusCode: {
            404: function() {
            alert("Book Not Found");
            }
        }
    });
});
