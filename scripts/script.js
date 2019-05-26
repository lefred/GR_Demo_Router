var positionFail = 0;
var positionRecovery = -140;
var positionGroup = -320;
var positionState = {};
var serverState = {};
var serverPart = {};
var serverNameBackground = {};
//var extendedView = 1;

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
    i_write = setInterval(mysql_write, 2000);
    button.firstChild.data = "Stop workload"
  } else {
    workload_running = 0;
    clearInterval(i_read);
    clearInterval(i_write);
    button.firstChild.data = "Run workload"
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
          var myServer = document.getElementById(data['aaData'][0]["read_from"]);
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
  var player = myServer.animate([
    // keyframes
    { transform: "translateY(" + positionState[ServerTarget] + "px)" },
    { transform: "translateY(" + positionGroup + "px)" }
  ],
    {
      // duree animation
      duration: 1000,
      // type de mouvement
      easing: 'ease-in-out',
    });
  player.addEventListener('finish', function () {
    myServer.style.transform = "translateY(" + positionGroup + "px)";
  });
  positionState[ServerTarget] = positionGroup;
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
}

function setToDown(ServerTarget) {
  var myServer = document.getElementById(ServerTarget);
  myServer.style.color = "lightgray";
  myServer.style.borderRight = "#f8981d dashed 0px";
  myServer.style.borderLeft = "#f8981d dashed 0px";
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
        } else if (data['aaData'][0]['member_state'] == 'RECOVERING') {
          if (serverState[ServerName] != 'RECOVERING') {
            setToStandalone(ServerName)
            changeStateServerToRecovery(ServerName);
            serverState[ServerName] = data['aaData'][0]['member_state']
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
