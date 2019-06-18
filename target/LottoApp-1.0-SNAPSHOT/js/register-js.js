$(document).ready(function(){
    $("#loader").hide();
    alert("Please provide your Paytm phone number. So that we can pay you faster. If you don't have paytm, you can use your friend's paytm number. If still no, then we will pay to your bank account.");
})
function registrationCheck(){
    console.log("yes, i am here 1");
    //var username = $("#username").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var confirmPassword = $("#password_confirm").val();
    var phoneNumber = $("#phoneNumber").val();
    var paytmPhoneNumber = $("#paytmPhoneNumber").val();
    var flag = 0;
    
    /*if(!isEmptyOrNull(username,"username")){
        alert("Please enter username");
        return false;
    }*/
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
    
    if(isEmptyOrNull(phoneNumber,"phoneNumber")){
       var phoneNumberValidationResult = validatePhoneNumber(phoneNumber);
       console.log("phoneNumberValidationResult " + phoneNumberValidationResult);
       if(phoneNumberValidationResult){
           
       }else{
           alert("Please enter valid phone number");
            return false;
       }
    }else{
        alert("Please enter valid phonenumber");
        return false;
    }
    
    if(isEmptyOrNull(paytmPhoneNumber,"paytmPhoneNumber")){
       var paytmPhoneNumberValidationResult = validatePhoneNumber(paytmPhoneNumber);
       console.log("paytmPhoneNumberValidationResult " + paytmPhoneNumberValidationResult);
       if(paytmPhoneNumberValidationResult){
           
       }else{
           alert("Please enter valid paytm phone number");
            return false;
       }
    }else{
        paytmPhoneNumber = "0000000000";
    }
    
    if(isEmptyOrNull(password,"password")){
       flag++;
    }else{
        alert("Please enter password");
        return false;
    }
    
    if(isEmptyOrNull(confirmPassword,"confirmpassword")){
       flag++;
    }else{
        alert("Please enter confirm password");
        return false; 
    }
    
    if(flag === 2){
        if(password !== confirmPassword){
            alert("password and confirm password should match");
            return false;
        }
    }
    
    var registrationObject = {};
    //registrationObject.name = username;
    registrationObject.email = email;
    registrationObject.password = password;
    registrationObject.phoneNumber = phoneNumber;
    registrationObject.paytmPhoneNumber = paytmPhoneNumber;
    console.log("making ajax call");
    $("#loader").show();
    $.post("rs",{registrationJsonString:JSON.stringify(registrationObject)},response); //todo : ajax call to backend
    
    function response(data){
        $("#loader").hide();
        var registerResponse = JSON.parse(data);
        if(registerResponse.status === "success"){
            //alert("done ajax call - success");
            //location.reload();
            window.location.href = "/login.html";
        }else if(registerResponse.status === "failed"){
            alert("Registration Failed. Please Register Again - That email might be already registerd. Please Try another");
            //alert("done ajax call - failed");
            location.reload();
        }
    }
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

function validatePhoneNumber(phoneNumber){
    if(phoneNumber.match(/\d/g) !== null && phoneNumber.match(/\d/g) !== undefined){
        if(phoneNumber.match(/\d/g).length===10){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}