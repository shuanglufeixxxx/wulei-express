export const mysqlAccountProd = {
    username: process.env.WE_MYSQL_USERNAME,
    password: process.env.WE_MYSQL_PASSWORD
}

const mysqlAttributeProd = {
    host: process.env.WE_MYSQL_HOST,
    port: process.env.WE_MYSQL_PORT,
    database: process.env.WE_MYSQL_DATABASE,
    url: '',
}

mysqlAttributeProd.url = `mysql://${mysqlAccountProd.username}:${mysqlAccountProd.password}@${mysqlAttributeProd.host}:${mysqlAttributeProd.port}/${mysqlAttributeProd.database}`

export { mysqlAttributeProd }