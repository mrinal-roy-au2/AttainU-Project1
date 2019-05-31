$(document).ready(function(){

            $.ajax({
            url: "https://api.github.com/users",
            datatype: "json",
            success: function(userdata) {
                for (var i=0; i<userdata.length; i++) {
                    $('body').append('<div class = "card" style="width: 30rem;"><img src = "'+userdata[i].avatar_url+' class="card-img-top"><div class="card-body"><h5 class="card-title">User: '+userdata[i].login+'</h5><p class="card-text">ID: '+userdata[i].id+'</p></div></div>');
                    // $('.card').append('<div class="card-body"></div>');
                    // $('.card').append('<img src = "'+userdata[i].avatar_url+' class="card-img-top">');
                    // $('.card-body').append('<h5 class="card-title">User: '+userdata[i].login+'</h5>');
                    // $('.card-body').append('<p class="card-text">ID: '+userdata[i].id+'</p>');
                }
                },
            statusCode: { 204: function() {alert("User Not Found");} }
        });

});
