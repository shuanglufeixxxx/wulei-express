import { Sequelize } from 'sequelize';
import { mysqlAttribute } from './secure_info/mysql-attribute';
import { initModels } from './models/init-models'

const sequelize = new Sequelize(mysqlAttribute.url);
const models = initModels(sequelize);
sequelize.sync();

export { sequelize, models }