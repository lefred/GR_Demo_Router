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


$sql_stats = "select COUNT_TRANSACTIONS_LOCAL_PROPOSED, COUNT_TRANSACTIONS_REMOTE_APPLIED, 
										 COUNT_TRANSACTIONS_REMOTE_IN_APPLIER_QUEUE, COUNT_TRANSACTIONS_ROWS_VALIDATING 
							from  performance_schema.replication_group_member_stats 
							where member_id=@@global.server_uuid;";

$sql_recovery = "select substring_index(substring_index(GTID_SUBTRACT(RECEIVED_TRANSACTION_SET,
												@@gtid_executed),':',-1),'-',-1)-
												substring_index(substring_index(GTID_SUBTRACT(RECEIVED_TRANSACTION_SET,
												@@gtid_executed),':',-1),'-',1) as trx_to_recover 
								 from performance_schema.replication_connection_status 
								 where channel_name='group_replication_recovery;";

if (isset($_GET['server'])){
			
	if (isset($mysqli_server)){
		$result = $mysqli_server->query($sql);

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
	}
	else {
			$results = [ "sEcho" => 0 ];
  }
	echo json_encode($results);
}
