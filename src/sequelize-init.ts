import { Sequelize } from 'sequelize';
import { mysqlAttribute } from './mysql/mysql-attribute';
import { initModels } from './models/init-models'

console.log('wulei-express: mysql url: %s', mysqlAttribute.url)
const sequelize = new Sequelize(mysqlAttribute.url);
const models = initModels(sequelize);
sequelize.sync();

export { sequelize, models }