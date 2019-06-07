<?php

// Servers connections

$user="clusteradmin";
$password="fred";
$database="clusterdemo";
$host="127.0.0.1";

if (isset($_GET['server'])) {
    $db="sys";
    $host = $_GET['server'];
    if (isset($_GET['port'])){
        $port = $_GET['port'];
    }
    else {
        $port = 3306;
    }

    $mysqli_server = mysqli_init();
    if (!$mysqli_server) {
        die('mysql_init failed!');
    }
    if (!$mysqli_server->options(MYSQLI_OPT_CONNECT_TIMEOUT,3)) {
        unset($mysqli_server);
        die('Setting MYSQLI_OPT_CONNECT_TIMEOUT failed');
    }
    if (!($mysqli_server->real_connect($host, $user, $password, $db, $port))) {
        unset($mysqli_server);
    }
} 
?>
