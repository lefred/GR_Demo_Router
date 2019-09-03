<?php
$data=null;
require('config.php');
$sql = "select member_role, member_state, member_version, @@read_only, 
        @@super_read_only,
        IF( MEMBER_STATE='ONLINE' AND 
          (
            (
              SELECT COUNT(*) FROM performance_schema.replication_group_members 
              WHERE MEMBER_STATE NOT IN ('ONLINE', 'RECOVERING')
            ) >= 
          (
            (
              SELECT COUNT(*) 
              FROM performance_schema.replication_group_members
             )/2
           ) = 0
          ), 'YES', 'NO' 
         ) `primary_partition` 
        from performance_schema.replication_group_members 
       JOIN performance_schema.replication_group_member_stats 
			 USING(member_id) where member_id=@@global.server_uuid;";

if ($_GET['server'] == "mysql1") {
	if ($mysqli_1) {
		$result = $mysqli_1->query($sql);
	}
} elseif ($_GET['server'] == "mysql2") {
	$result = $mysqli_2->query($sql);
} else {
	$result = $mysqli_3->query($sql);
}

if ($result) {
	while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
		$data[] = $row;
	}
	if (!$data) {
		$echo = 2;
	} else {
		$echo = 1;
	}
	$results = [
		"sEcho" => $echo,
		"aaData" =>  $data
	];
} else {
	$results = [ "sEcho" => 0 ];
}

echo json_encode($results);
