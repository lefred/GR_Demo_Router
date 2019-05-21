<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MySQL InnoDB Cluster - Demo</title>
  <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
  <style>
   .read_div { font-size: 30px; vertical-align:bottom; }
   .write_div { font-size: 30px; vertical-align:bottom; }
   .read_res { border: 1px solid; }
   .write_res { border: 1px solid; }
  </style>
</head>
<body>
<img src="InnoDBCluster.png">
<p> 
<div style="width:50%; display: inline-block"><font size="10px" color="green">READS</font>
</div><div style="width:50%; display: inline-block;"><font size="10px" color="red">WRITES</font>
</div>
<div style="width:50%; display: inline-block"><p class='read_div'></p>
</div><div style="width:50%; display: inline-block;"><p class='write_div'></p>
</div>
</p>
<p> 
<div style="width:50%; display: inline-block"><p class='read_res'></p>
</div><div style="width:50%; display: inline-block;"><p class='write_res'></p>
</div>
</p>
<script>
var i_read = setInterval(mysql_read, 1000);
var i_write = setInterval(mysql_write, 2000);
var data;

function mysql_read() {
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
                              "<strong>timestamp:</strong> " + data['aaData'][0]["entered"] 
                              );
        } else {
           $(".read_div").append("<font color='black'>&#9632;</font> ");
        }
        $(".read_res").append(" (" + data['iQueryResponseTime'] + "ms)");
      }
    });
}

function mysql_write() {
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
        $(".write_res").append(" (" + data['iQueryResponseTime'] + "ms)");
      }
    });
  $(document).scrollTop($(document).height());
}

</script>
 
</body>
</html>
