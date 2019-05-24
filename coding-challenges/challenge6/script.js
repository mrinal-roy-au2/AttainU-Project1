function citiesList(inputletter) {
    $.ajax({
        // url: './cities.json',
        url: "https://raw.githubusercontent.com/attainu-falcon/attainu-falcon/master/coding-challenges/cities.json",
        datatype: "json",
        success: function(inputdata) {
            var cityarray = [];
            for (var i=0; i<inputdata.length; i++) {
                if (inputletter === inputdata[i].name[0]) {
                    cityarray.push(inputdata[i].name)
                }
            }
            console.log(cityarray);
            // return cityarray;



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
