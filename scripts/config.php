<?php

// Router connections

$user="clusteradmin";
$password="fred";
$database="clusterdemo";
$host="mysql1";
$port_r=6447;
$port_w=6446;


$mysqli_r = mysqli_init();
if (!$mysqli_r) {
   die('mysql_init failed!');
}
if (!$mysqli_r->options(MYSQLI_OPT_CONNECT_TIMEOUT,3)) {
   die('Setting MYSQLI_OPT_CONNECT_TIMEOUT failed');
}
$mysqli_r->real_connect($host, $user, $password, $database, $port_r); 
 
$mysqli_w = mysqli_init();
if (!$mysqli_w) {
   die('mysql_init failed!');
}
if (!$mysqli_w->options(MYSQLI_OPT_CONNECT_TIMEOUT,3)) {
   die('Setting MYSQLI_OPT_CONNECT_TIMEOUT failed');
}
$mysqli_w->real_connect($host, $user, $password, $database, $port_w); 
 

// Each servers

$user_admin = "clusteradmin";
$pwd_admin = "fred";
$db="sys";
$host1 = "mysql1";
$host2 = "mysql2";
$host3 = "mysql3";
$port1 = 3306;
$port2 = 3306;
$port3 = 3306;

$mysqli_1 = mysqli_init();
if (!$mysqli_1) {
   die('mysql_init failed!');
}
if (!$mysqli_1->options(MYSQLI_OPT_CONNECT_TIMEOUT,3)) {
   die('Setting MYSQLI_OPT_CONNECT_TIMEOUT failed');
}
$mysqli_1->real_connect($host1, $user_admin, $pwd_admin, $db, $port1); 
 

$mysqli_2 = mysqli_init();
if (!$mysqli_2) {
   die('mysql_init failed!');
}
if (!$mysqli_2->options(MYSQLI_OPT_CONNECT_TIMEOUT,3)) {
   die('Setting MYSQLI_OPT_CONNECT_TIMEOUT failed');
}
$mysqli_2->real_connect($host2, $user_admin, $pwd_admin, $db, $port2); 

$mysqli_3 = mysqli_init();
if (!$mysqli_3) {
   die('mysql_init failed!');
}
if (!$mysqli_3->options(MYSQLI_OPT_CONNECT_TIMEOUT,3)) {
   die('Setting MYSQLI_OPT_CONNECT_TIMEOUT failed');
}
$mysqli_3->real_connect($host3, $user_admin, $pwd_admin, $db, $port3); 

?>
