
$(document).ready(function () {
    var lottosToSelectWinner;
    //console.log("requesting available lottos");
    $("#loader").show();
    $.ajax({
        type: 'get',
        url: 'gltswbols',
        cache: false,
        data: {
            select_lottoId:$("#select_lottoId").val()
        },
        success: function(data) {
            //console.log("true" + data);
            $("#loader").hide();
            lottosToSelectWinner = JSON.parse(data);
            addTable(lottosToSelectWinner);
        },
        
    });
    //feedAvailableLottosToTable(availableLottos);
})

function onSelectOfLottoIdInDropDown(selected){
    alert("working");
    var lottosToSelectWinner;
    $("#loader").show();
    $.ajax({
        type: 'get',
        url: 'gltswbols',
        cache: false,
        data: {
            select_lottoId:selected.value
        },
        success: function(data) {
            //console.log("true" + data);
            $("#loader").hide();
            lottosToSelectWinner = JSON.parse(data);
            addTable(lottosToSelectWinner);
        },
        
    });
}

function lottoIdToPass(lottoId,userid,winner){
    console.log(lottoId + "  " + userid + " " + winner);
    
    /* ajax call start*/
    var postSelectedWinnerObject = {};
    postSelectedWinnerObject.userid = userid;
    postSelectedWinnerObject.lottoid = lottoId;
    postSelectedWinnerObject.status = winner;
     $("#loader").show();
    $.post("gltswbols",{postSelectedWinnerJsonString:JSON.stringify(postSelectedWinnerObject)},response); //todo : ajax call to backend
    
    
    /* ajax call end*/
}

function response(data){
 $("#loader").hide();
 alert(data + "done ajax call");
 location.reload();
}

function addTable(lottosToApproveOrReject) {
  //console.log("length of available lotts " + availableLottos.length);
  var myTableDiv = document.getElementById("myDynamicTable");
  myTableDiv.innerHTML = "";
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
           td.appendChild(document.createTextNode("Select Winner"));
      
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
          td.appendChild(document.createTextNode(lottosToApproveOrReject[i].userid + " No. of Wins are " + lottosToApproveOrReject[i].numberOfWinsByUser));
      else if(j == 1)
          td.appendChild(document.createTextNode(lottosToApproveOrReject[i].lottoid));
      else if(j == 2)
          td.appendChild(document.createTextNode(lottosToApproveOrReject[i].transactionid));
      else if(j == 3)
          td.appendChild(document.createTextNode(lottosToApproveOrReject[i].status));
      else if(j == 4){
        var winnerButton =  document.createElement("button");
        
        winnerButton.id = "button"+lottosToApproveOrReject[i].lottoid+"&"+lottosToApproveOrReject[i].userid;
        
        winnerButton.onclick = function(){
              lottoIdToPass(this.id.substring(6,this.id.lastIndexOf("&")),this.id.substring(this.id.lastIndexOf("&")+1,this.id.length),"winner");
              alert("this id " + this.id);
        }
        
        winnerButton.className = "button";
        winnerButton.innerHTML  = "winner";
        
        td.appendChild(winnerButton);
        
      }
      
      tr.appendChild(td);
    }
  }
  myTableDiv.appendChild(table);
}

