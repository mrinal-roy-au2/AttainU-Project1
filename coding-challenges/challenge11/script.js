$(document).ready(function(){
            $.ajax({
            url: "https://api.github.com/users",
            datatype: "json",
            success: function(userdata) {
                for (var i=0; i<userdata.length; i++) {
                    var username = userdata[i].login;
                    var userid = userdata[i].id;
                    var avatar = userdata[i].avatar_url;
                    // var userprofile = userdata.html_url;
                    // var user_sub = userdata.subscriptions_url;
                    // var user_org = userdata.organizations_url;
                    // var followers = userdata.followers_url;
                    // var following = userdata.following_url;
                    $('body').append('<div class = "card"></div>');
                    $('card').append('<img src = "'+avatar+' class="card-img-top" style="width: 18rem;">');
                    // $('img').addClass("card-img-top");
                    $('card-img-top').append('<div class="card-body"></div>');
                    // $('div').addClass('card-body');
                    $('card-body').append('<h5 class="card-title">'+username+'</h5>');
                    // $('h5').addClass("card-title");
                    $('card-title').append('<p class="card-text">'+userid+'</p>');
                    // $('p').addClass("card-text");
                    // //
                    //
                    // $('p').addClass("card-text");
                    console.log(username);
                    console.log(userid);
                    }

                },
            statusCode: { 204: function() {alert("User Not Found");} }
        });

});
