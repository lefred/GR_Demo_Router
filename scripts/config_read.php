<?php

// Router connections read

$user="clusteradmin";
$password="fred";
$database="clusterdemo";
$host="127.0.0.1";
$port_r=6447;

$mysqli_r = mysqli_init();
if (!$mysqli_r) {
    die('mysql_init failed!');
}
if (!$mysqli_r->options(MYSQLI_OPT_CONNECT_TIMEOUT,3)) {
    die('Setting MYSQLI_OPT_CONNECT_TIMEOUT failed');
}
$mysqli_r->real_connect($host, $user, $password, $database, $port_r); 

?>
