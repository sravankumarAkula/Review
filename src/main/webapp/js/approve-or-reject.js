
$(document).ready(function () {
    var lottosToApproveOrReject;
    //console.log("requesting available lottos");
     $("#loader").show();
    $.ajax({
        type: 'get',
        url: 'gtdrtas',
        cache: false,
        data: {
            
        },
        success: function(data) {
            //console.log("true" + data);
            $("#loader").hide();
            lottosToApproveOrReject = JSON.parse(data);
            addTable(lottosToApproveOrReject);
        },
        
    });
    //feedAvailableLottosToTable(availableLottos);
})

function lottoIdToPass(lottoId,userid,approvedOrRejected){
    console.log(lottoId + "  " + userid + " " + approvedOrRejected);
    
    /* ajax call start*/
    var postApprovedOrRejectedJsonString = {};
    postApprovedOrRejectedJsonString.userid = userid;
    postApprovedOrRejectedJsonString.lottoid = lottoId;
    postApprovedOrRejectedJsonString.status = approvedOrRejected;
     $("#loader").show();
    $.post("gtdrtas",{postApprovedOrRejectedJsonString:JSON.stringify(postApprovedOrRejectedJsonString)},response); //todo : ajax call to backend
    
    
    /* ajax call end*/
}

function response(data){
 $("#loader").hide();
 //alert(data + "done ajax call");
 location.reload();
}

function addTable(lottosToApproveOrReject) {
  //console.log("length of available lotts " + availableLottos.length);
  var myTableDiv = document.getElementById("myDynamicTable");

  var table = document.createElement('TABLE');
  table.setAttribute('class', 'table');
  table.border = '1';
  //console.log("here 1");
  var tableHead = document.createElement('THEAD');
  table.appendChild(tableHead);
  var trh = document.createElement('TR');
  
  tableHead.appendChild(trh); 
   //console.log("here 2");
   for(var j = 0 ; j < 5 ; j++){
       //console.log("loop " + j);
       var td = document.createElement('TD');
       td.setAttribute('class', 'c1');
       if(j == 0)
           td.appendChild(document.createTextNode("userid"));
       else if(j ==1)
           td.appendChild(document.createTextNode("lottoid"));
       else if(j == 2)
           td.appendChild(document.createTextNode("transaction id"));
       else if(j == 3)
           td.appendChild(document.createTextNode("status"));
       else if(j == 4)
           td.appendChild(document.createTextNode("Approve Or Reject"));
      
       trh.appendChild(td);
   }
    
    
  var tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);

  for (var i = 0; i < lottosToApproveOrReject.length; i++) {
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);

    for (var j = 0; j < 5; j++) {
      var td = document.createElement('TD');
      td.setAttribute('class', 'c2');
      td.width = '75';
      if(j == 0)
          td.appendChild(document.createTextNode(lottosToApproveOrReject[i].userid));
      else if(j == 1)
          td.appendChild(document.createTextNode(lottosToApproveOrReject[i].lottoid));
      else if(j == 2)
          td.appendChild(document.createTextNode(lottosToApproveOrReject[i].transactionid));
      else if(j == 3)
          td.appendChild(document.createTextNode(lottosToApproveOrReject[i].status));
      else if(j == 4){
        var approveButton =  document.createElement("button");
        var RejectButton =  document.createElement("button");
        approveButton.id = "button"+lottosToApproveOrReject[i].lottoid+"&"+lottosToApproveOrReject[i].userid;
        RejectButton.id = "button"+lottosToApproveOrReject[i].lottoid+"&"+lottosToApproveOrReject[i].userid;
        approveButton.onclick = function(){
              lottoIdToPass(this.id.substring(6,this.id.lastIndexOf("&")),this.id.substring(this.id.lastIndexOf("&")+1,this.id.length),"approved");
              //console.log("this id " + this.id);
        }
        RejectButton.onclick = function(){
              lottoIdToPass(this.id.substring(6,this.id.lastIndexOf("&")),this.id.substring(this.id.lastIndexOf("&")+1,this.id.length),"rejected");
              //console.log("this id " + this.id);
        }
        approveButton.className = "button";
        approveButton.innerHTML  = "approve";
        
        RejectButton.className = "button";
        RejectButton.innerHTML  = "reject";

        td.appendChild(approveButton);
        td.appendChild(RejectButton);
      }
      
      tr.appendChild(td);
    }
  }
  myTableDiv.appendChild(table);
}

