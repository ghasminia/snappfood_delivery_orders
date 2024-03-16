import dotenv from 'dotenv';
import IConfig from '../interfaces/config';

dotenv.config();

const Config: IConfig = {
    app: {
        port: parseInt(process.env.APP_PORT || '3000', 10),
        host: process.env.APP_HOST || 'localhost'
    }
}

export default Config;
