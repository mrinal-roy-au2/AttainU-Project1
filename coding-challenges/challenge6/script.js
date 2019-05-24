function citiesList(inputletter) {
    $.ajax({
        // url: './cities.json',
        url: "https://raw.githubusercontent.com/attainu-falcon/attainu-falcon/master/coding-challenges/cities.json",
        datatype: "json",
        success: function(inputdata) {
            var inputjson = JSON.parse(inputdata);
            var cityarray = [];
            for (var i=0; i<inputjson.length; i++) {
                if (inputletter === inputjson[i].name[0]) {
                    cityarray.push(inputjson[i].name)
                }
            }

            console.log(cityarray);


        },
        statusCode: {
            404: function() {
            alert("File Not Found");
            }
        }
    })
}

citiesList("M");
citiesList("R")
