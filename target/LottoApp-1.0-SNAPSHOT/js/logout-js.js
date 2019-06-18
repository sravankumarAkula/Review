function invalidateUser(){
    //alert("in invalidate");
    $.ajax({
        type: 'get',
        url: 'logouts',
        cache: false,
        data: {
            
        },
        success: function(data) {
            var logoutResponse = JSON.parse(data);
            //alert("logoutresponse " + logoutResponse.status);
            window.location.href = "/index.html";
        }
    });
}
