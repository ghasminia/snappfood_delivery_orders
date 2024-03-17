import { Sequelize } from 'sequelize';
import Config from './config/config';

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: Config.db.host,
    port: Config.db.port,
    username: Config.db.username,
    password: Config.db.password,
    database: Config.db.database,
    logging: false
});

export default sequelize;
