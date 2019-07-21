/* jshint esversion: 6*/

$(document).ready(function() {
//newfolio buy function - start
  $("#newfolio").click(function() {
    //new portfolio button click
    var folioheader = '<div class="row"><div class="col"><div class=" card0">';
    folioheader +=
      '<div class="card-body"><h5 class="card-title">' +
      $("#newfolioname").val();
    folioheader +=
      '</h5><p class="card-text"><table class="table table-hover" id="tab' +
      $("#newfolioname").val() +
      '">';
    folioheader += '<thead><tr><th scope="col">Scrip</th>';
    folioheader +=
      '<th scope="col">Buy Price</th><th scope="col">Qty</th><th scope="col">Current Price</th>';
    folioheader += "</tr></thead></table></p></div></div></div></div>";

    $("body").append(folioheader);
    var addNewFolio = $("#newfolioname").val(); //User selects portfolio name & this variable to be routed to /makefolio route
    $.ajax({   //ajax-1 start
      //Use Ajax to POST this addNewFolio variable to backend-db
      type: "POST",
      // async: false,
      url: "/portfolio/new",
      dataType: "json",
      data: { folioname: addNewFolio },
      success: function(folioNameData) {
        console.log("Created New Portfolio Database");
      }});  //end Ajax-1

// <a class="btn" data-target="#myModel" role="button" data-toggle="modal">Launch demo modal</a>

    var addScripToFolioBtn = '<div class="container"><button type="button" class="btn btn-primary" id="btn';
    addScripToFolioBtn +=  $("#newfolioname").val()+'" data-toggle="modal" data-target="#ModalForm">';
    addScripToFolioBtn += "Add Stocks to Portfolio</button></div>";
    console.log(addScripToFolioBtn);
    var tableID = "tab"+$("#newfolioname").val();
    console.log(tableID);
    $("body").append(addScripToFolioBtn); //append 'Add Stocks to Portfolio' blue color button

//today's typed/copied
    // var modalForm = '<div class="container"><div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
    // modalForm += '<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">';
    // modalForm += '<h5 class="modal-title" id="exampleModalLabel">Scrip Details to Buy</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close">';
    // modalForm += '<span aria-hidden="true">&times;</span></button></div><div class="modal-body"><div class="input-group mb-3"><div class="input-group-prepend">';
    // modalForm += '<span class="input-group-text" id="inputGroup-sizing-default">Quantity</span>';
    // modalForm += '</div><input type="number" class="form-control" id="qty" aria-label="Sizing example input" size="4" aria-describedby="inputGroup-sizing-default"></div>';
    // modalForm += '</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>';
    // modalForm += '<button type="submit" class="btn btn-primary" id="buy">Buy</button></div></div></div></div></div>';
//previously existed
    var modalForm = '<div class="container"><div class="modal fade" id="ModalForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
    modalForm += '<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">';
    modalForm += '<h5 class="modal-title" id="exampleModalLabel">Scrip Details to Buy</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close">';
    modalForm += '<span aria-hidden="true">&times;</span></button></div><div class="modal-body"><div class="input-group mb-3"><div class="input-group-prepend" id="ModalFormInput">';
    modalForm += '<span class="input-group-text" id="inputGroup-sizing-default">Quantity</span>';
    modalForm += '</div><input type="number" class="form-control" id="qty" aria-label="Sizing example input" size="4" aria-describedby="inputGroup-sizing-default"></div>';
    modalForm += '</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>';
    modalForm += '<button type="submit" class="btn btn-primary" id="buy">Buy</button></div></div></div></div></div>';
    var buttonID = "#" + "btn" + $("#newfolioname").val(); //adding selector to the new Add Scrip button to be added in next few lines
    console.log(buttonID);
    $("body").append(modalForm);
    $(buttonID).click(function() {   //click event of 'Add Stocks to Portfolio' button
      // createStockList();
      console.log("created list of stocks");
      // function createStockList() {
        $.ajax({    //start of Ajax-2
        //function to read stock symbols & create select-option list
          url: "../dbfolder/Scrip_Codes_global.json",
          datatype: "json",
          success: function(stock_symbol) {
            var scrip_list = '<div class="input-group mb-3" id="option"><div class="input-group-prepend">';
            scrip_list += '<label class="input-group-text" id="optionLabel" for="inputGroupSelect01">Scrips To Select</label></div>';
            scrip_list += '<select class="custom-select" id="inputGroupSelect01"><option selected>Choose...</option>';
            for (var key in stock_symbol) {
              scrip_list += "<option value="+stock_symbol[key].symb+">"+stock_symbol[key].company+"</option>";
            }
            scrip_list += "</select></div>";
            $(".modal-body").append(scrip_list);
            console.log(scrip_list);
            $("#buy").click(function() {    //buy button on Modalform click

            var qty = $("#qty").val();     //quantity of stocks user buys
            console.log(qty);
            var company_tag = $("#inputGroupSelect01").find(":selected").val(); //company stock symbol
            console.log(company_tag);
            var company = $("#inputGroupSelect01").find(":selected").text(); //company name description
            console.log(company);
            var targetValURL ="https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=";
            targetValURL += company_tag+"&apikey=QFPE374MAA7UUDC7";
            $.ajax({  //start of ajax-3
              //Ajax to fetch current market price while buying
              url: targetValURL,
              datatype: "json",
              success: function(targetValURL) {
                console.log(targetValURL);
                buy_price = targetValURL["Global Quote"]["05. price"]; //buyprice of the stock user buys
                var current_price = targetValURL["Global Quote"]["05. price"];
                var tab_row =
                  "<tr><td>" +
                  company_tag +
                  "</td><td>" +
                  buy_price +
                  "</td><td>" +
                  qty +
                  "</td><td>" +
                  current_price +
                  "</td></tr>";


                // var tab_row = "<tr><td>"+company_tag+"</td><td>"+buy_price+"</td><td>"+qty;
                // tab_row += "</td><td>"+current_price+"</td></tr>";
                $("#"+tableID).append(tab_row);
                console.log(tab_row);
                $.ajax({   //start of ajax-4
                  // POST this buy_price to backend-db thru AJAX; also post qty & stocks boaught to backend-db
                  type: "POST",
                  url: "/portfolio/addscrip",
                  dataType: "json",
                  data: {
                    folioname: addNewFolio,
                    buyprice: buy_price,
                    scrip: company_tag,
                    qty: qty
                  },
                  success: function(buydata) {
                    console.log("Bought "+qty+"shares of "+company_tag+" @"+buy_price);
                  }
                });  //end of ajax-4
              }
            }); //end of Ajax-3
          }); //close brackets of #buy button click event

          }
        });   //end of Ajax-2
      // }

      // $("#inputGroupSelect01").remove();
      // $("#optionLabel").remove();



        });  //close braces for buttonID click event
      });  //close brackets for newfolio click event
//---------------------------FOLIO SUMMARY CODE---------------------------//

      //folio summary preparation functions
      var buy_price;
      //add below this portfolio summary dropdown button

      var summaryBtn = '<br><div class="container"><div class="input-group mb-3"><div class="input-group-prepend">';
      summaryBtn += '<button class="btn btn-outline-secondary" type="button" action="/portfolio/performance" method="POST" id="Summary">Click Here for Portfolio Summary</button>';
      summaryBtn += '</div><select class="custom-select" id="inputGroupSelect03" aria-label="Example select with button addon">';
      summaryBtn += "<option selected>Choose Portfolio...</option>";
      function getFolios() {
        $.ajax({   //start Ajax-5
          //Use Ajax to POST this addNewFolio variable to backend-db
          type: "GET",
          // async: false,
          url: "/portfolio/list",
          dataType: "json",
          success: function(listOfFolios) {
            console.log(listOfFolios);
            for (var i = 0; i < listOfFolios.length; i++) {
              $("#inputGroupSelect03").append(
                $("<option></option>").attr("value", listOfFolios[i]).text(listOfFolios[i])
              );
            }
          }
        });   //end Ajax-5
      }
      $("body").append(summaryBtn); //append Portfolio Summary Button & Options
      getFolios();
      var company, costprice, quantity, cmp;
      $("#Summary").click(function() {
        var folio_req = $("#inputGroupSelect03").find(":selected").text();
        var sum_hdr = '<table class="table table-hover" id="'+folio_req+'">'+folio_req;
        sum_hdr += '<thead><tr><th scope="col">Scrip</th><th scope="col">Buy Price</th>';
        sum_hdr += '<th scope="col">Qty</th><th scope="col">Current Market Price</th>';
        sum_hdr += '<th scope="col">Unrealised Gain/Loss</th></tr></thead></table>';
        var summaryTabID = "#"+folio_req;
        console.log(summaryTabID);
        $("body").append(sum_hdr);
        console.log(folio_req);

        $.ajax({    //start Ajax-6
          // async: false,
          type: "POST",
          crossDomain:true,
          url: "/portfolio/performance",
          data: { folio_req: folio_req },
          success: function(combined_folios) {
            console.log(combined_folios);
            var i;
            for (i = 0; i < combined_folios.length; i++) {
              tag = combined_folios[i].scrip;
              console.log(tag);
              boughtprice = combined_folios[i].buyprice;
              console.log(boughtprice);
              numbers = combined_folios[i].qty;
              console.log(numbers);
              liveCMP_url = "https://financialmodelingprep.com/api/v3/stock/real-time-price/"+tag;
              row_id = "#row"+i;
              // row = '<tr id='+row_id+'><td>'+tag+'</td><td>'+boughtprice+'</td><td>'+numbers+'</td></tr>';
              // $(summaryTabID).append(row);
              // console.log(row);
              console.log(liveCMP_url);
              liveCMP(liveCMP_url, row_id, tag, boughtprice, numbers);
              async function liveCMP(arg, row_index, tag, boughtprice, numbers){
                await $.ajax({   //start Ajax-7
                  url: arg,
                  crossDomain:true,
                  type: "GET",
                  dataType: "json",
                  success: function(data) {
                    row = '<tr id='+row_index+'><td>'+tag+'</td><td>'+boughtprice+'</td><td>'+numbers+'</td><td>'+data.price+'</td>';
                    row += '<td>'+((data.price - boughtprice)/boughtprice).toPrecision(1)+' % </td></tr>'
                    $(summaryTabID).append(row);
                    console.log(row);
                  }
                });   //end Ajax-7
              }
            }
          }
        });  //end Ajax-6
      });  //closing backets for Summary button click function

  // $("#qty").val("");
  // $("#inputGroupSelect01")
  //   .find(":selected")
  //   .remove()
  //   .text();
  // var addNewFolio = $("#newfolioname").val();
  // var qty = $('#qty').val();
  // var company_tag = $("#inputGroupSelect01").find(":selected").val();

});  //closing set of barckets for document.ready
