import dotenv from 'dotenv';
import IConfig from '../interfaces/config';

dotenv.config();

const Config: IConfig = {
    app: {
        port: parseInt(process.env.APP_PORT || '3000', 10),
        host: process.env.APP_HOST || 'localhost'
    },
    db: {
        type: process.env.DB_TYPE || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USERNAME || 'user',
        password: process.env.DB_PASSWORD || 'pass',
        database: process.env.DB_DATABASE || 'database'
    },
    url: {
        estimatedDelivery: process.env.URL_ESTIMATED_DELIVERY || 'http://domain.com'
    }
}

export default Config;
