= MySQL InnoDB Cluster Demo Kit (web version)

Currently you need:
- php
- php-json
- php-mysqlnd

Currently you need to enable  `default-authentication-plugin=mysql_native_password` before you create the user because PHP doesn't support yet `caching_sha2_password`:

```
php -r 'phpinfo();' | grep auth_ | cut -d' ' -f4| tr ',' '\n'
mysqlnd
debug_trace
auth_plugin_mysql_native_password
auth_plugin_mysql_clear_password
auth_plugin_sha256_password
```

You also need to run the following steps in your database:

```
mysql -e "CREATE DATABASE clusterdemo"
mysql clusterdemo < clusterdemo.sql
mysql -e "create user clusterdemo identified by 'fred'"
mysql -e "grant all privileges on *.* to clusterdemo@'%'"
```

