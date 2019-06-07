<?php

// Router connections write

$user="clusteradmin";
$password="fred";
$database="clusterdemo";
$host="127.0.0.1";
$port_w=6446;

$mysqli_w = mysqli_init();
if (!$mysqli_w) {
    die('mysql_init failed!');
}
if (!$mysqli_w->options(MYSQLI_OPT_CONNECT_TIMEOUT,3)) {
    die('Setting MYSQLI_OPT_CONNECT_TIMEOUT failed');
}
$mysqli_w->real_connect($host, $user, $password, $database, $port_w); 
?>