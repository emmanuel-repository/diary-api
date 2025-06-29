import { Sequelize } from 'sequelize';
import { initModels } from '../models/init-models';
import config from '../config';


export const sequelize = new Sequelize(config.mysql.database || '', config.mysql.user || '', config.mysql.password, {
  host: config.mysql.host,
  dialect: 'mysql'
});

export const db = initModels(sequelize);