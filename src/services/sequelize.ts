import { Sequelize } from 'sequelize';
import { appName } from '../configs/app';
import { mysqlAttribute } from '../configs/mysql';
import { initModels } from '../models'
import debugModule from 'debug';

const debug = debugModule(appName + ':/src/services/sequelize.ts');
debug(':8 mysql url: %s', mysqlAttribute.url)

const sequelize = new Sequelize(mysqlAttribute.url);
const models = initModels(sequelize);
sequelize.sync();

export { sequelize, models }