<?php

require('config.php');
$sql = "select *, @@hostname 'read_from' from demo order by entered desc limit 1;";
$time = microtime(true);
$result = $mysqli_r->query($sql);
$diff = microtime(true)-$time;
$milliseconds =  $diff * 1000;

if ($result) {
  while($row = $result->fetch_array(MYSQLI_ASSOC)){
    $data[] = $row;
  }

  $results = ["sEcho" => 1,
        	"iTotalRecords" => count($data),
        	"iTotalDisplayRecords" => count($data),
		"iQueryResponseTime" => round($milliseconds,5),
        	"aaData" => $data ];
} else {
  $results = ["sEcho" => 0,
		"iQueryResponseTime" => round($milliseconds,5)];

}

echo json_encode($results);

?>
