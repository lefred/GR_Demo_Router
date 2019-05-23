<?php

require('config.php');
$sql = "select member_role, member_state, member_version, @@read_only, @@super_read_only from performance_schema.replication_group_members where member_host=@@hostname;";
if ( $_GET['server'] == "mysql4" ) {
	$result = $mysqli_1->query($sql);
} elseif ( $_GET['server'] == "mysql2" ) {
        $result = $mysqli_2->query($sql);
} else {
        $result = $mysqli_3->query($sql);
}

if ($result) {
  while($row = $result->fetch_array(MYSQLI_ASSOC)){
    $data[] = $row;
  }

  $results = ["sEcho" => 1,
        	"iTotalRecords" => count($data),
        	"iTotalDisplayRecords" => count($data),
        	"aaData" => $data ];
} else {
  $results = ["sEcho" => 0 ];

}

echo json_encode($results);

?>
