var positionFail = 0;
var positionRecovery = -140;
var positionGroup = -320;
var positionState = {};
var serverState = {};
var serverPart = {};
var serverNameBackground = {};
var extendedView = 0;

positionState['mysql1'] = 0;
positionState['mysql2'] = 0;
positionState['mysql3'] = 0;

serverState['mysql1'] = 'N/A';
serverState['mysql2'] = 'N/A';
serverState['mysql3'] = 'N/A';

serverPart['mysql1'] = 'YES';
serverPart['mysql2'] = 'YES';
serverPart['mysql3'] = 'YES';

serverNameBackground['mysql1'] = 'mysql1';
serverNameBackground['mysql2'] = 'mysql2';
serverNameBackground['mysql3'] = 'mysql3';

var i_read;
var i_write;
var data;
var read_lock = 0;
var write_lock = 0;
var workload_running = 0;
var mysql1_info = setInterval(function () { get_server_info('mysql1'); }, 1000);
var mysql2_info = setInterval(function () { get_server_info('mysql2'); }, 1000);
var mysql3_info = setInterval(function () { get_server_info('mysql3'); }, 1000);

function run_workload() {
  var button = document.getElementById('button-workload');
  if (workload_running == 0) {
    workload_running = 1;
    i_read = setInterval(mysql_read, 1000);
    i_write = setInterval(mysql_write, 1000);
    button.firstChild.data = "Stop workload";
  } else {
    workload_running = 0;
    clearInterval(i_read);
    clearInterval(i_write);
    button.firstChild.data = "Run workload";
  }
}

function setStats(ServerName, stats){
 var server_extra_info;
 switch (ServerName) {
    case "mysql1":
      server_extra_info = document.getElementById('server1_info_extra');
      break;
    case "mysql2":
      server_extra_info = document.getElementById('server2_info_extra');
      break;
    case "mysql3":
      server_extra_info = document.getElementById('server3_info_extra');
      break;
  }
  var string_stats = "Local Prop Tx: " + stats['COUNT_TRANSACTIONS_LOCAL_PROPOSED'] + "\n" 
                   + " Tx Remote Ap: " + stats['COUNT_TRANSACTIONS_REMOTE_APPLIED'] + "\n"
                   + " Tx Remote AQ: " + stats['COUNT_TRANSACTIONS_REMOTE_IN_APPLIER_QUEUE'] + "\n"
                   + " Tx Rows Val.: " + stats['COUNT_TRANSACTIONS_ROWS_VALIDATING'];
  server_extra_info.textContent=string_stats;
  
}

function setEmptyExtra(ServerName) {
 switch (ServerName) {
    case "mysql1":
      server_extra_info = document.getElementById('server1_info_extra');
      break;
    case "mysql2":
      server_extra_info = document.getElementById('server2_info_extra');
      break;
    case "mysql3":
      server_extra_info = document.getElementById('server3_info_extra');
      break;
  }
  var string_stats = "";
  server_extra_info.textContent=string_stats;
}

function setRecoveryTrx(ServerName, recovery_trx){
 var server_extra_info;
 switch (ServerName) {
    case "mysql1":
      server_extra_info = document.getElementById('server1_info_extra');
      break;
    case "mysql2":
      server_extra_info = document.getElementById('server2_info_extra');
      break;
    case "mysql3":
      server_extra_info = document.getElementById('server3_info_extra');
      break;
  }
  var string_stats = "Tx To Recover: " + recovery_trx['trx_to_recover'];
  server_extra_info.textContent=string_stats;
}

function enable_extended_view() {
  var button = document.getElementById('button-extended-view');
  var box=document.getElementById('server-zone');
  var server1=document.getElementById('mysql1');
  var server2=document.getElementById('mysql2');
  var server3=document.getElementById('mysql3');
  var server1_extra_info=document.getElementById('server1_info_extra');
  var server2_extra_info=document.getElementById('server2_info_extra');
  var server3_extra_info=document.getElementById('server3_info_extra');

  if (extendedView == 0) {
    extendedView = 1;
    button.firstChild.data = "Normal view";
    box.style.height="200px";

    if ( server1.style.transform == "translateY(-320px)" ) {
      server1.style.transform = "translateY(-370px)";
    } 
    if ( server2.style.transform == "translateY(-320px)" ) {
      server2.style.transform = "translateY(-370px)";
    }
    if ( server3.style.transform == "translateY(-320px)"  ) {
     server3.style.transform = "translateY(-370px)";
    }
    server1_extra_info.style.visibility="visible";
    server2_extra_info.style.visibility="visible";
    server3_extra_info.style.visibility="visible";
  } else {
    extendedView = 0;
    button.firstChild.data = "Extended view";
    box.style.height="150px";
    if ( server1.style.transform == "translateY(-370px)" ) {
      server1.style.transform = "translateY(-320px)";
    } 
    if ( server2.style.transform == "translateY(-370px)" ) {
      server2.style.transform = "translateY(-320px)";
    }
    if ( server3.style.transform == "translateY(-370px)"  ) {
     server3.style.transform = "translateY(-320px)";
    }
    server1_extra_info.style.visibility="hidden";
    server2_extra_info.style.visibility="hidden";
    server3_extra_info.style.visibility="hidden";
  }
}

function mysql_read() {
  var tot_size = document.body.offsetHeight;
  var rwh = document.getElementById('router_window').offsetHeight;
  var rwh_pct = rwh / tot_size * 100;
  if (rwh_pct > 70) {
    $(".read_div").empty();
    $(".write_div").empty();
  }

  if (read_lock == 0) {
    read_lock = 1;
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "scripts/reads.php",
      data: data,
      success: function (data) {
        $(".read_res").empty();
        if (data['sEcho'] == 1) {
          $(".read_div").append("<font color='green'>&#9632;</font> ");
          $(".read_res").append("<strong>id:</strong> " + data['aaData'][0]["id"] + " | " +
            "<strong>hostname:</strong> " + data['aaData'][0]["hostname"] + " | " +
            "<strong>timestamp:</strong> " + data['aaData'][0]["entered"] +
            "<br><strong>read from:</strong> " + data['aaData'][0]["read_from"]
          );
          if (extendedView==1) {
            var myServer = document.getElementById(data['aaData'][0]["read_from"] + "_pop");
          } else {
            var myServer = document.getElementById(data['aaData'][0]["read_from"]);
          }
          myServer.classList.add("server-read");
          setTimeout(function () {
            myServer.classList.remove("server-read");
          }, 600);

        } else {
          $(".read_div").append("<font color='black'>&#9632;</font> ");
        }
        $(".read_res").append(" (" + data['iQueryResponseTime'] + "ms)");
        read_lock = 0;
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
      url: "scripts/writes.php",
      data: data,
      success: function (data) {
        $(".write_res").empty();
        if (data['sEcho'] == 1) {
          $(".write_div").append("<font color='red'>&#9632;</font> ");
          $(".write_res").append("<strong>id:</strong> " + data['iLastID']);
        } else {
          $(".write_div").append("<font color='black'>&#9632;</font> ");
        }
        $(".write_res").append("<br> (" + data['iQueryResponseTime'] + "ms)");
        write_lock = 0;
      }
    });
  }
  else {
    $(".write_div").append("<font color='black'>&#9633;</font> ");
  }
  //$(document).scrollTop($(document).height());
}


function changeStateServerToFail(ServerTarget) {
  var myServer = document.getElementById(ServerTarget);
  var player = myServer.animate([
    // keyframes
    { transform: "translateY(" + positionState[ServerTarget] + "px)" },
    { transform: "translateY(" + positionFail + "px)" }
  ],
    {
      // duree animation
      duration: 1000,
      // type de mouvement
      easing: 'ease-in-out',
    });
  player.addEventListener('finish', function () {
    myServer.style.transform = "translateY(" + positionFail + "px)";
    //myServer.style.color ="#f00";
  });
  positionState[ServerTarget] = positionFail;
  return positionState[ServerTarget]
}

function changeStateServerToRecovery(ServerTarget) {
  var myServer = document.getElementById(ServerTarget);
  var player = myServer.animate([
    // keyframes
    { transform: "translateY(" + positionState[ServerTarget] + "px)" },
    { transform: "translateY(" + positionRecovery + "px)" }
  ],
    {
      // duree animation
      duration: 1000,
      // type de mouvement
      easing: 'ease-in-out',
    });
  player.addEventListener('finish', function () {
    myServer.style.transform = "translateY(" + positionRecovery + "px)";
    //myServer.style.color ="#0f0";
  });
  positionState[ServerTarget] = positionRecovery;
  return positionState[ServerTarget]

}

function changeStateServerToGroup(ServerTarget) {
  var myServer = document.getElementById(ServerTarget);
  var positionGroup_loc = positionGroup;
  if ( extendedView == 1 ) {
    positionGroup_loc = positionGroup_loc - 50;
  }
  var player = myServer.animate([
    // keyframes
    { transform: "translateY(" + positionState[ServerTarget] + "px)" },
    { transform: "translateY(" + positionGroup_loc + "px)" }
  ],
    {
      // duree animation
      duration: 1000,
      // type de mouvement
      easing: 'ease-in-out',
    });
  player.addEventListener('finish', function () {
    myServer.style.transform = "translateY(" + positionGroup_loc + "px)";
  });
  positionState[ServerTarget] = positionGroup_loc;
  return positionState[ServerTarget]
}

function setToPrimary(ServerTarget) {
  var myServer = document.getElementById(ServerTarget);
  myServer.style.color = "red";
  myServer.style.borderRight = "#f8981d dashed 0px";
  myServer.style.borderLeft = "#f8981d dashed 0px";
}

function setToSecondary(ServerTarget) {
  var myServer = document.getElementById(ServerTarget);
  myServer.style.color = "green";
  myServer.style.borderRight = "#f8981d dashed 0px";
  myServer.style.borderLeft = "#f8981d dashed 0px";
}

function setToStandalone(ServerTarget) {
  var myServer = document.getElementById(ServerTarget);
  myServer.style.color = "#5d87a1";
  myServer.style.borderRight = "#f8981d dashed 0px";
  myServer.style.borderLeft = "#f8981d dashed 0px";
  setEmptyExtra(ServerTarget);
}

function setToDown(ServerTarget) {
  var myServer = document.getElementById(ServerTarget);
  myServer.style.color = "lightgray";
  myServer.style.borderRight = "#f8981d dashed 0px";
  myServer.style.borderLeft = "#f8981d dashed 0px";
  setEmptyExtra(ServerTarget);
}

function setToPartitionned(ServerTarget) {
  var myServer = document.getElementById(ServerTarget);
  myServer.style.color = "#f8981d";
  switch (ServerTarget) {
    case "mysql1":
      myServer.style.borderRight = "#f8981d dashed 1px";
      break;
    case "mysql2":
      myServer.style.borderRight = "#f8981d dashed 1px";
      myServer.style.borderLeft = "#f8981d dashed 1px";
      break;
    case "mysql3":
      myServer.style.borderLeft = "#f8981d dashed 1px";
      break;
  }
}

function get_server_info(ServerName) {
  //console.log(server);
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "scripts/cluster_info.php?server=" + serverNameBackground[ServerName],
    data: data,
    success: function (data) {
      //console.log(ServerName);
      //console.debug(data);
      if (data['sEcho'] == 1) {
        if (data['aaData'][0]['member_state'] == 'ONLINE') {
          if (data['aaData'][0]['member_role'] == 'PRIMARY') {
            if (serverState[ServerName] != 'PRIMARY') {
              setToPrimary(ServerName);
              changeStateServerToGroup(ServerName);
            }
            if ( data['aaData'][0]['primary_partition'] != serverPart[ServerName]) {
              setToPrimary(ServerName);
            }
          } else if (data['aaData'][0]['member_role'] == 'SECONDARY') {
            if (serverState[ServerName] != 'SECONDARY') {
              setToSecondary(ServerName);
              changeStateServerToGroup(ServerName);
            }
          }
          if (data['aaData'][0]['primary_partition'] == 'NO') {
            if (serverPart[ServerName] == 'YES') {
              setToPartitionned(ServerName);
              serverPart[ServerName] = 'NO';
            }
          } else {
            serverPart[ServerName] = "YES";
          }
          serverState[ServerName] = data['aaData'][0]['member_role'];
          if (data['aaStats'] && extendedView==1) {
            setStats(ServerName,data['aaStats'][0]);
          }
        } else if (data['aaData'][0]['member_state'] == 'RECOVERING') {
          if (serverState[ServerName] != 'RECOVERING') {
            setToStandalone(ServerName)
            changeStateServerToRecovery(ServerName);
            serverState[ServerName] = data['aaData'][0]['member_state']
          }
          if (data['aaRecovery'] && extendedView==1) {
             setRecoveryTrx(ServerName,data['aaRecovery'][0]);
          }
        } else if (data['aaData'][0]['member_state'] == 'OFFLINE') {
          if (serverState[ServerName] != 'OFFLINE') {
            setToStandalone(ServerName)
            changeStateServerToFail(ServerName);
            serverState[ServerName] = data['aaData'][0]['member_state']
          }
        }
      } else if (data['sEcho'] == 2) {
        setToStandalone(ServerName);
      } else {
        changeStateServerToFail(ServerName);
        setToDown(ServerName)
      }
    },
    error: function (data) {
      console.log("failed");
    }
  });
}
