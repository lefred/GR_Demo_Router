<?php

require('config_write.php');
$sql = "insert into demo values(0,@@hostname,now());";
$time = microtime(true);
$result = $mysqli_w->query($sql);
$diff = microtime(true)-$time;
$milliseconds =  $diff * 1000;

if ($result) {
  $last_id = $mysqli_w->insert_id;
  $results = ["sEcho" => 1,
              "iLastID" => $last_id,
	      "iQueryResponseTime" => round($milliseconds,5)];
} else {
  $results = ["sEcho" => 0,
	      "iQueryResponseTime" => round($milliseconds,5)];
}

echo json_encode($results);

?>
