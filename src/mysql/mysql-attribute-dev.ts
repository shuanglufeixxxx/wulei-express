export const mysqlAccountDev = {
    username: 'wulei_server_admin',
    password: 'hQ0VWsYvegvXsHs1'
}

const mysqlAttributeDev = {
    host: 'localhost',
    port: '3306',
    database: 'wulei_dev',
    url: '',
}

mysqlAttributeDev.url = `mysql://${mysqlAccountDev.username}:${mysqlAccountDev.password}@${mysqlAttributeDev.host}:${mysqlAttributeDev.port}/${mysqlAttributeDev.database}`

export { mysqlAttributeDev }