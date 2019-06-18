$(document).ready(function(){
    $("#loader").hide();
})

function loginCheck(){
    //alert("yes, i am here in login");
    var email = $("#email").val();
    var password = $("#password").val();
    
    if(isEmptyOrNull(email,"email")){
        var emailValidationResult = validateEmail(email)
        console.log("emailValidationResult " + emailValidationResult);
        if(emailValidationResult){
            
        }else{
            alert("Please enter valid email");
            return false;
        }
    }else{
        alert("Please enter email");
        return false;
    }
    if(isEmptyOrNull(password,"password")){
       
    }else{
         alert("Please enter password");
        return false;
    }
    
    var loginObject = {};
    loginObject.email = email;
    loginObject.password = password;
    
    //alert("making ajax call");
   
   /* start */
   $("#loader").show();
   $.ajax({
        type: 'post',
        url: 'ls',
        cache: false,
        //dataType: 'json',
        data: {
            loginJsonString:JSON.stringify(loginObject)
        },
        success: function(data) {
            //alert("success");
            console.log("data " + JSON.stringify(data));
            
            var resultFromService = JSON.parse(data);
            //alert("resultFromService.status " + resultFromService.status);
            
            
            $("#loader").hide();
             
            if(resultFromService.status === "success"){
                 //alert("true");
                window.location.href = "/lottos_available.html";
            
            }else{
                window.location.href = "/wrong_login.html";
            }
        }
    });
   
   /* end */
}

function isEmptyOrNull(value,flag){
    console.log(" :: value --> " + value + " :: flag --> " + flag);
    if(value !== "" && value !== null && value !== undefined){
        return true;
    }else{
        return false;
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
