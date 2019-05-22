var table = document.createElement('table');
table.style.border = "2px solid black";
document.querySelector('body').appendChild(table);

for (var i=0; i<11; ++i) {
        var tableRows = document.createElement('tr');
        table.appendChild(tableRows);
        tableRows.style.height = "30px";
        for (var j=0; j<2; ++j) {
            if (i<1 && j<2) {
                    var headerValues = ['Number', 'Square of Number'];
                    var header = document.createElement('th');
                    header.style.border = "2px solid black";
                    header.appendChild(document.createTextNode(headerValues[j]));
                    tableRows.appendChild(header);
                } else {
            var tableValues = document.createElement('td');
            tableValues.style.border = "2px solid black";
            tableValues.style.width = "150px";
            tableValues.style.textalign = "middle";
            tableValues.appendChild(document.createTextNode(Math.pow(i,j+1)));
            tableRows.appendChild(tableValues);
        }
    }
}
