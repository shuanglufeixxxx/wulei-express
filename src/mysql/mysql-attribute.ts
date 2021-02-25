export const mysqlAccount = {
    username: process.env.WE_MYSQL_USERNAME,
    password: process.env.WE_MYSQL_PASSWORD
}

const mysqlAttribute = {
    host: process.env.WE_MYSQL_HOST,
    port: process.env.WE_MYSQL_PORT,
    database: process.env.WE_MYSQL_DATABASE,
    url: '',
}

mysqlAttribute.url = `mysql://${mysqlAccount.username}:${mysqlAccount.password}@${mysqlAttribute.host}:${mysqlAttribute.port}/${mysqlAttribute.database}`

export { mysqlAttribute }