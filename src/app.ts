import express from 'express';
import { json, urlencoded } from "body-parser";
import Config from './config/config';
import responseMiddleware from './middlewares/responseMiddleware';


class App {
  public app: express.Application;

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
  }

  private routes(): void {
    this.app.use(responseMiddleware);
  }
}

export default new App().app;
