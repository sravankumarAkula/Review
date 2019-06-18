function insertNewLotto(){
    console.log("yes, i am here 1");
    var lottoid = $("#lottoid").val();
    var description = $("#description").val();
    var amount_to_pay = $("#amount_to_pay").val();
    var last_day_to_register = $("#last_day_to_register").val();
    var lotto_draw_date = $("#lotto_draw_date").val();
    var flag = 0;
    
    if(!isEmptyOrNull(lottoid,"lottoid")){
        alert("Please enter lottoid");
        return false;
    }
    if(!isEmptyOrNull(description,"description")){
        alert("Please enter description");
        return false;
    }
    if(!isEmptyOrNull(amount_to_pay,"amount_to_pay")){
        alert("Please enter amount_to_pay");
        return false;
    }
    if(!isEmptyOrNull(last_day_to_register,"last_day_to_register")){
        alert("Please enter last_day_to_register");
        return false;
    }
    if(!isEmptyOrNull(lotto_draw_date,"lotto_draw_date")){
        alert("Please enter lotto_draw_date");
        return false;
    }
    
   
    
    var insertNewLottoObject = {};
    insertNewLottoObject.lottoid = lottoid;
    insertNewLottoObject.description = description;
    insertNewLottoObject.amount_to_pay = amount_to_pay;
    insertNewLottoObject.last_day_to_register = last_day_to_register;
    insertNewLottoObject.lotto_draw_date = lotto_draw_date;
    console.log("making ajax call");
    
    $.post("rs",{insertNewLottoJsonString:JSON.stringify(insertNewLottoObject)},response); //todo : ajax call to backend
    
    function response(data){
       
        var insertNewLottoResponse = JSON.parse(data);
        if(insertNewLottoResponse.status === "success"){
            //alert("done ajax call - success");
            //location.reload();
            //window.location.href = "/LottoApp/login.html";
        }else if(insertNewLottoResponse.status === "failed"){
            //alert("done ajax call - failed");
           // location.reload();
        }
    }
}

function isEmptyOrNull(value,flag){
    console.log(" :: value --> " + value + " :: flag --> " + flag);
    if(value === "" || value === null || value === undefined){
        return false;
    }else{
        return true;
    }
}