import express from 'express';
import "reflect-metadata";
import { Sequelize } from 'sequelize';
import sequelize from "./database";
import { json, urlencoded } from "body-parser";
import Config from './config/config';
import responseMiddleware from './middlewares/responseMiddleware';
import errorMiddleware from './middlewares/errorMiddleware';
import apiRouter from './routes/api';

class App {
    public app: express.Application;
    private sequelize: Sequelize = sequelize;

    constructor() {
        this.app = express();
        const app = this.app;
        this.config();
        this.routes();
    }

    private config(): void {
        // Support parsing of application/json type post data
        this.app.use(json());

        // Support parsing of application/x-www-form-urlencoded post data
        this.app.use(urlencoded({ extended: true }));

        // Sets the port the app will listen on
        this.app.set("port", Config.app.port);
        
        (async () => {
            await this.sequelize.authenticate();
        })
    }

    private routes(): void {
        this.app.use("/api", apiRouter);
        this.app.use(responseMiddleware);
        this.app.use(errorMiddleware);
    }
}

export default new App().app;
