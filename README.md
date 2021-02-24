## Wulei-express
Wulei fansite's server developed by express.js.\
It's secured by advanced JWT auth with refresh token & access token.\
The frontend project for Wulei fansite is [here](https://github.com/shuanglufeixxxx/wulei-angular-xsrf)\
This project is migrated and upgraded from my old github ([sparrowtree](https://github.com/sparrowtree/wulei-server))## Docker deployment
docker build --tag \<username\>/\<appname\>:\<tagname\> ./\
docker run -p 443:443 -d \<username\>/\<appname\>:<tagname\>
## Setup local MySQL Server
install MySQL Server 5.7\
add 'export PATH="/usr/local/mysql/bin:$PATH"' to ~/.bash_profile
## Setup local database
$ mysql -u root -p\
\> create user 'username' identified by 'password';\
\> create database wulei character set utf8mb4 collate utf8mb4_general_ci;\
\> grant all on wulei.* to 'username';
## Backup & restore database
$ mysqldump -u root -p --databases wulei \> wulei-dump.sql --no-create-db\
\> source /pathto/wulei-dump.sql;