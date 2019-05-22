= MySQL InnoDB Cluster Demo Kit (web version)

Currently you need:
- php
- php-json
- php-mysqlnd

Currently you need to enable  `default-authentication-plugin=mysql_native_password`.

You also need to run the following steps in your database:

mysql -e "CREATE DATABASE clusterdemo"
mysql clusterdemo < clusterdemo.sql
mysql -e "create user clusterdemo identified by 'fred'"
mysql -e "grant all privileges on *.* to clusterdemo@'%'"


