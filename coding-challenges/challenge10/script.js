$(function() {
    $("h3").remove();
    $('button').click(function() {
        $("h3").remove();
        if ($("#string1").val().length === $("#string2").val().length) {
            var arg1 = $("#string1").val();
            var arg2 = $("#string2").val();
            var hammingLen = 0;
            for (var i=0; i<arg1.length; i++)
                hammingLen = (arg1.charAt(i) != arg2.charAt(i)) ? (hammingLen+1) : hammingLen;
            $("form").append("<h3>Hamming Length of the 2 strings : "+hammingLen+"</h3>");
            $("h3").addClass("alert alert-success");
            $("h3").css({"position":"relative","top":"10px"});
        } else {
            $("form").append("<h3>Both Strings should be of same length. Try Again!</h3>");
            $("h3").addClass("alert alert-danger");
            $("h3").css({"position":"relative","top":"10px"});
        }
});
});
