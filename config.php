<?php

// Router connections

$user="clusterdemo";
$password="fred";
$database="clusterdemo";
$host="127.0.0.1";
$port_r=6447;
$port_w=6446;


$mysqli_r = new mysqli($host, $user, $password, $database, $port_r);
$mysqli_w = new mysqli($host, $user, $password, $database, $port_w);

// Each servers

$user_admin = "clusterdemo";
$pwd_admin = "fred";
$db="sys";
$host1 = "mysql1";
$host2 = "mysql2";
$host3 = "mysql3";

$mysqli_1 = new mysqli($host1, $user_admin, $pwd_admin, $db, 3306);
$mysqli_2 = new mysqli($host2, $user_admin, $pwd_admin, $db, 3306);
$mysqli_3 = new mysqli($host3, $user_admin, $pwd_admin, $db, 3306);

?>
