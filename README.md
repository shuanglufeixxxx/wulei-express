## Wulei-express
Wulei fansite's server developed by express.js.\
It's secured by advanced JWT auth with refresh token & access token.\
The frontend project for Wulei fansite is [here](https://github.com/shuanglufeixxxx/wulei-angular-jwt)
## Docker deployment
export WE_TAG=\<image_tag\> && sh ./build.sh \
docker-compose up
## Setup local MySQL Server
install MySQL Server 5.7\
add 'export PATH="/usr/local/mysql/bin:$PATH"' to ~/.bash_profile
## Setup local database
$ mysql -u root -p\
\> create user 'username' identified by 'password';\
\> create database wulei character set utf8mb4 collate utf8mb4_general_ci;\
\> grant all on wulei.* to 'username';
## Backup & restore database
$ mysqldump --default-character-set=utf8mb4 -u root -p --databases wulei \> wulei-dump.sql --no-create-db\
\> source /pathto/wulei-dump.sql;