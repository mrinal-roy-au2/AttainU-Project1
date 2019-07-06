$(document).ready((function() {
  console.log("hi");
  $.ajax({  //fetching market news through API for market news feed in homepage
    //  "https://stocknewsapi.com/api/v1?tickers=TSLA&items=10&token=e6eecw0crva6czkfjeg1drsbj2xnq6kgb4rylmar"
    url: "https://stocknewsapi.com/api/v1?tickers=TSLA&items=10&token=e6eecw0crva6czkfjeg1drsbj2xnq6kgb4rylmar",
    // url: "https://newsapi.org/v2/sources?language=en&category=business&apiKey=8ad7b81062244ec892726aa778e20f45",
    datatype: "json",
    success: function(newsdata) {
      console.log(mktnewsfeeddata);
      console.log(mktnewsfeeddata.data.length);
      for (var i = 0; i<mktnewsfeeddata.data.length; i++) {
        var link_href = mktnewsfeeddata.data[i].news_url;
        $("#MktLiveFeeds").append('<a href="'+link_href+'" target="_blank"><li class="list-group-item news-list"></li></a>');
        console.log(mktnewsfeeddata.data[i].news_url);
        }
      for (var j = 0; j<mktnewsfeeddata.data.length; j++) {
        $(".news-list").eq(j).text(mktnewsfeeddata.data[j].news_url);
        }
      }});

      $.ajax({  //fetching market news through API for market news in marketnews page
        //  "https://stocknewsapi.com/api/v1?tickers=TSLA&items=10&token=e6eecw0crva6czkfjeg1drsbj2xnq6kgb4rylmar"
        // url: "https://stocknewsapi.com/api/v1?tickers=TSLA&items=10&token=e6eecw0crva6czkfjeg1drsbj2xnq6kgb4rylmar",
        url: "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=8ad7b81062244ec892726aa778e20f45",
        datatype: "json",
        success: function(newsdata) {
          console.log(newsdata);
          console.log(newsdata.articles.length);
          for (var i = 0; i<newsdata.articles.length; i++) {
            var link_news_href = newsdata.articles[i].url;
            var newscard = '<div class="card mb-3" style="max-width: 540px;"><div class="row no-gutters">';
            newscard += '<div class="col-md-4"><img src="'+newsdata.articles[i].urlToImage+'" class="card-img" alt="..."></div>';
            newscard += '<div class="col-md-8"><div class="card-body"><h5 class="card-title">'+newsdata.articles[i].title+'</h5>';
            newscard += '<p class="card-text">'+newsdata.articles[i].description+'</p>';
            newscard += '<p class="card-text"><a href="'+link_news_href+'" target="_blank"><small class="text-muted">'+newsdata.articles[i].url+'</small></a></p>';
            newscard += '</div></div></div></div>';
            $("#mktnewspage").append(newscard);
            }
          }});
    }));
