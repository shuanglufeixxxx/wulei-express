# Develop notes
$ git init\
$ npm init\
$ npm install express\
$ npm install @types/express source-map-support tslint typescript --save-dev\
$ npm install sequelize mysql2\
$ npm install sequelize-auto\
$ npx sequelize-auto -o "./models" -d wulei -h localhost -u mysql_username -p 3306 -x password -e mysql -l ts\
$ npm install jsonwebtoken dotenv\
$ npm install @types/jsonwebtoken @types/dotenv --save-dev\
$ node\
\> require('crypto').randomBytes(64).toString('hex')\
paste to .env like 'ACCESS_TOKEN_SECRET=...'