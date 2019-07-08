$(document).ready(function() {
  console.log("hi");
  $.ajax({
    //fetching business news through API
    url:
      "https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=8ad7b81062244ec892726aa778e20f45",
    datatype: "json",
    success: function(newsdata) {
      console.log(newsdata);
      console.log(newsdata.articles.length);
      for (var i = 0; i < newsdata.articles.length; i++) {
        var newsitem = '<li class="list-group-item news-list">';
        newsitem +=
          '<a href="' +
          newsdata.articles[i].url +
          'target="_blank">' +
          newsdata.articles[i].title +
          "</li></a>";
        $("#LiveNews").append(newsitem);
        console.log(newsdata.articles[i].title);
      }
    }
  });

  $.ajax({
    //fetching India business news through API for parketnews.html page
    url:
      "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=8ad7b81062244ec892726aa778e20f45",
    datatype: "json",
    success: function(indianewsdata) {
      console.log(indianewsdata);
      console.log(indianewsdata.articles.length);
      for (var i = 0; i < indianewsdata.articles.length; i++) {
        var news_item =
          '<div class="container"><div class="card mb-9" style="max-width: 1000px;"><div class="row no-gutters">';
        news_item +=
          '<div class="col-md-4"><img src="' +
          indianewsdata.articles[i].urlToImage +
          '" class="card-img" alt="..."></div><div class="col-md-8">';
        news_item +=
          '<div class="card-body"><h5 class="card-title"><a href="' +
          indianewsdata.articles[i].url +
          '" target="_blank">' +
          indianewsdata.articles[i].title +
          "</a></h5>";
        news_item +=
          '<p class="card-text">' +
          indianewsdata.articles[i].description +
          '</p><p class="card-text"><small class="text-muted"></small></p>';
        news_item += "</div></div></div></div></div>";
        $("#LiveIndiaNewsPage").append(news_item);
      }
    }
  });
});
