import express, { Application, ErrorRequestHandler } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import configs from '../config';

import user from '../routers/user.route';
import errorHandler  from '../middlewares/error-handler.middleware';

export default class Server {
  private app: Application;
  private port: number;

  constructor() {
   
    this.app = express();
    this.port = Number(configs.app.port) || 4000;

    this.configureMiddlewares();
    this.configureRoutes();
    this.configureErrorHandling()
  }

  private configureMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
  }

  private configureRoutes(): void {
    this.app.use('/api', user);
  }

  private configureErrorHandling(): void {
    this.app.use(errorHandler);
  }
 
  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en http://localhost:${this.port}`);
    });
  }
}