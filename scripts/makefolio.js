/* jshint esversion: 6*/

$(document).ready(function(){
  var buy_price;
  $("#newfolio").click(function() {  //new portfolio button click
    var folioheader = '<div class="row"><div class="col"><div class=" card0">';
    folioheader+= '<div class="card-body"><h5 class="card-title">'+$("#newfolioname").val();
    folioheader+= '</h5><p class="card-text"><table class="table table-hover" id="'+$("#newfolioname").val()+'">';
    folioheader+= '<thead><tr><th scope="col">Scrip</th>';
    folioheader+= '<th scope="col">Buy Price</th><th scope="col">Qty</th><th scope="col">Current Price</th>';
    folioheader+= '</tr></thead></table></p></div></div></div></div>';
    $('body').append(folioheader);
    var addNewFolio = $("#newfolioname").val(); //User selects portfolio name & this variable to be routed to /makefolio route
    $.ajax({    //Use Ajax to POST this addNewFolio variable to backend-db
      type: "POST",
      // async: false,
      url: "/makenewfolio",
      dataType: "json",
      data: {"folioname":addNewFolio}
    }).done(function(folioNameData){
      console.log("Created New Portfolio Database");
    });

    var addScripToFolioBtn = '<button type="button" class="btn btn-primary" id="btn'+$("#newfolioname").val()+'" data-toggle="modal" data-target="#exampleModal">';
    addScripToFolioBtn += 'Add Stocks to Portfolio</button>';
    console.log(addScripToFolioBtn);
    var tableID = $("#newfolioname").val();
    console.log(tableID);
    $('body').append(addScripToFolioBtn);  //append 'Add Stocks to Portfolio' button
    var modalForm = '<div class="container"><div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
    modalForm += '<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">';
    modalForm += '<h5 class="modal-title" id="exampleModalLabel">Scrip Details to Buy</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close">';
    modalForm += '<span aria-hidden="true">&times;</span></button></div><div class="modal-body"><div class="input-group mb-3"><div class="input-group-prepend">';
    modalForm += '<span class="input-group-text" id="inputGroup-sizing-default">Quantity</span>';
    modalForm += '</div><input type="number" class="form-control" id="qty" aria-label="Sizing example input" size="4" aria-describedby="inputGroup-sizing-default"></div>';
    modalForm += '</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>';
    modalForm += '<button type="submit" class="btn btn-primary" id="buy">Buy</button></div></div></div></div></div>';
    var buttonID = '#'+'btn'+$("#newfolioname").val();  //adding selector to the new Add Scrip button to be added in next few lines
    console.log(buttonID);
    $('body').append(modalForm);  //append modalForm
      $(buttonID).click(function(){   //click event of 'Add Stocks to Portfolio' button
        $('#inputGroupSelect01').remove();
        $('#optionLabel').remove();
        $.ajax({   //function to read stock symbols & create select-option list
          url: "../dbfolder/Scrip_Codes_global.json",
          datatype: "json",
          success: function(stock_symbol){
            var scrip_list = '<div class="input-group mb-3" id="option"><div class="input-group-prepend"><label class="input-group-text" id="optionLabel" for="inputGroupSelect01">Options</label></div>';
            scrip_list += '<select class="custom-select" id="inputGroupSelect01"><option selected>Choose...</option>';
            for (var key in stock_symbol) {
              scrip_list += '<option value='+stock_symbol[key].symb+'>'+stock_symbol[key].company+'</option>';
            }
            scrip_list += '</select></div>';
            $('.modal-body').append(scrip_list);
            $('#buy').click(function() {   //buy button on Modalform click
              var qty = $('#qty').val();  //quantity of stocks user buys
              console.log(qty);
              var company_tag = $("#inputGroupSelect01").find(":selected").val();  //company stock symbol
              console.log(company_tag);
              var company = $("#inputGroupSelect01").find(":selected").text();    //company name description
              console.log(company);
              var targetValURL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+company_tag+"&apikey=PUQRIVP3LNMBSDKV";
              $.ajax({  //Ajax to fetch current market price while buying
                url: targetValURL,
                datatype: "json",
                success: function(targetValURL) {
                    console.log(targetValURL);
                    buy_price = targetValURL["Global Quote"]["05. price"];  //buyprice of the stock user buys
                    // console.log(buy_price);
                    // var company = $("#inputGroupSelect01").find(":selected").text();
                    //
                    var current_price = targetValURL["Global Quote"]["05. price"];
                    // console.log(targetValURL);
                    // console.log(company);
                    // console.log(current_price);
                    // console.log(qty);
                    // console.log(tableID);
                    var tab_row = '<tr><td>'+company_tag+'</td><td>'+buy_price+'</td><td>'+qty+'</td><td>'+current_price+'</td></tr>';
                    // console.log(tab_row);
                    $('#'+tableID).append(tab_row);
                    $.ajax({   // POST this buy_price to backend-db thru AJAX; also post qty & stocks boaught to backend-db
                      type: "POST",
                      url: "/addscrip",
                      dataType: "json",
                      data: {"folioname":addNewFolio,"buyprice":buy_price,"scrip":company_tag,"qty":qty}
                      }).done(function(buydata){
                        console.log("Bought "+qty+"shares of "+company_tag+" @"+buy_price);
                      });
                  }});});
                }});
              });});}
          );
                  $('body').append('<button type="button" class="btn btn-primary btn-sm" id="portfolioSummary">Portfolio Summary</button>');
                  $('#portfolioSummary').click(function(){ window.location = '/getsummary';});
                  $('#qty').val('');
                  $("#inputGroupSelect01").find(":selected").remove().text();
                  // var addNewFolio = $("#newfolioname").val();
                  // var qty = $('#qty').val();
                  // var company_tag = $("#inputGroupSelect01").find(":selected").val();









// function liveCMP (arg) {
//   var targetValURL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+arg+"&apikey=PUQRIVP3LNMBSDKV";
//   $.ajax({
//     url: targetValURL,
//     dataType: "json",
//     success: function(targetValURL) {
//       var buy_price = targetValURL["Global Quote"]["05. Price"];
//       var current_price = targetValURL["Global Quote"]["05. Price"];
//       console.log(targetValURL["Global Quote"]["05. Price"]);
//       $(tableID).append('<tr><td>'+company+'</td><td>'+buy_price+'</td><td>'+qty+'</td><td>'+current_price+'</td></tr>');
//             }
//           });
//         }
