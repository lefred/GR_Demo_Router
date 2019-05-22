var positionFail = 0;
var positionRecovery  = -160;
var positionGroup  = -260;

var mysql1_info = setInterval(get_server1_info, 1000);
var mysql2_info = setInterval(get_server2_info, 1000);
var mysql3_info = setInterval(get_server3_info, 1000);
var i_read = setInterval(mysql_read, 1000);
var i_write = setInterval(mysql_write, 2000);
var data;
var read_lock=0;
var write_lock=0;



function changeStateServeurToFail(serveurTarget){
    var monServeur = document.getElementById(serveurTarget);
    monServeur.style.transform = "translateY(" + positionFail + "px)";
}

function changeStateServeurToRecovery(serveurTarget){
    var monServeur = document.getElementById(serveurTarget);
    monServeur.style.transform = "translateY(" + positionRecovery + "px)";
    
}

function changeStateServeurToGroup(serveurTarget){
    var monServeur = document.getElementById(serveurTarget);
    monServeur.style.transform = "translateY(" + positionGroup+ "px)";
}


function mysql_read() {
  var tot_size = document.body.offsetHeight;
  var rwh = document.getElementById('router_window').offsetHeight;
  var rwh_pct = rwh / tot_size * 100;
  if ( rwh_pct > 70 ) {
     $(".read_div").empty();
     $(".write_div").empty();
  }
     
  if (read_lock == 0) {
    read_lock = 1;
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "reads.php",
      data: data,
      success: function(data) {
        $(".read_res").empty();
        if (data['sEcho'] == 1) {
           $(".read_div").append("<font color='green'>&#9632;</font> ");
           $(".read_res").append("<strong>id:</strong> " + data['aaData'][0]["id"] + " | " + 
                              "<strong>hostname:</strong> " + data['aaData'][0]["hostname"] + " | " + 
                              "<strong>timestamp:</strong> " + data['aaData'][0]["entered"] + 
                              "<br><strong>read from:</strong> " + data['aaData'][0]["read_from"]
                              );
        } else {
           $(".read_div").append("<font color='black'>&#9632;</font> ");
        }
        $(".read_res").append(" (" + data['iQueryResponseTime'] + "ms)");
        read_lock=0;
      }
    });
  }
  else {
     $(".read_div").append("<font color='black'>&#9633;</font> ");
  }
}

function mysql_write() {
  if (write_lock == 0) {
    write_lock = 1;

    $.ajax({
      type: "GET",
      dataType: "json",
      url: "writes.php",
      data: data,
      success: function(data) {
        $(".write_res").empty();
        if (data['sEcho'] == 1) {
           $(".write_div").append("<font color='red'>&#9632;</font> ");
           $(".write_res").append("<strong>id:</strong> " + data['iLastID']);
        } else {
           $(".write_div").append("<font color='black'>&#9632;</font> ");
        }
        $(".write_res").append("<br> (" + data['iQueryResponseTime'] + "ms)");
        write_lock=0;
      }
    });
  }
  else {
     $(".write_div").append("<font color='black'>&#9633;</font> ");
  }
  //$(document).scrollTop($(document).height());
}

function get_server1_info() {
    //console.log(server);
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "cluster_info.php?server=mysql1",
      data: data,
      success: function(data) {
        if (data['sEcho'] == 1) {
            if (data['aaData'][0]['member_state'] == 'ONLINE') {
                changeStateServeurToGroup('serveur1-off');
            }
        } else {
            console.log("get info problem"); 
        }
      }
    });
}

function get_server2_info() {
    //console.log(server);
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "cluster_info.php?server=mysql2",
      data: data,
      success: function(data) {
        if (data['sEcho'] == 1) {
            if (data['aaData'][0]['member_state'] == 'ONLINE') {
                changeStateServeurToGroup('serveur2-off');
            }
        } else {
            console.log("get info problem"); 
        }
      }
    });
}

function get_server3_info() {
    //console.log(server);
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "cluster_info.php?server=mysql3",
      data: data,
      success: function(data) {
        if (data['sEcho'] == 1) {
            if (data['aaData'][0]['member_state'] == 'ONLINE') {
                changeStateServeurToGroup('serveur3-off');
            }
        } else {
            console.log("get info problem"); 
        }
      }
    });
}

