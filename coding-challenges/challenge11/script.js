$(document).ready(function(){
            $.ajax({
            url: "https://api.github.com/users",
            datatype: "json",
            success: function(userdata) {
                $('body').append('<div class = "card"></div>');
                for (var i=0; i<userdata.length; i++) {
                    var avatar = userdata[i].avatar_url;
                    var username = userdata[i].login;
                    var userid = userdata[i].id;
                    $('.card').append('<img src = "'+avatar+' class="card-img-top" style="width: 18rem;">');
                    $('.card').append('<div class="card-body"></div>');
                    $('.card-body').append('<h5 class="card-title">User: '+username+'</h5>');
                    $('.card-body').append('<p class="card-text">ID: '+userid+'</p>');
                }
                },
            statusCode: { 204: function() {alert("User Not Found");} }
        });

});
