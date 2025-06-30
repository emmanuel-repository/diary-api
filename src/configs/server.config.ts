import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import configs from '../config';
import fs from 'fs';

import user from '../routers/user.route';
import errorHandler from '../middlewares/error-handler.middleware';
import path from 'path';

export default class Server {
  private app: Application;
  private port: number;

  constructor() {
    this.ensureUploadDir();

    this.app = express();
    this.port = Number(configs.app.port) || 4000;

    this.configureMiddlewares();
    this.configureRoutes();
    this.configureErrorHandling()
  }

  private configureMiddlewares(): void {
    this.app.use(bodyParser.json({ limit: '500mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
    this.app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
    this.app.use('/public', express.static(path.join(__dirname, '../../public')));
  }

  private configureRoutes(): void {
    this.app.use('/api', user);
  }

  private configureErrorHandling(): void {
    this.app.use(errorHandler);
  }

  private ensureUploadDir(): void {
    const uploadDir = path.join(__dirname, '../../public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log('📁 Carpeta de uploads creada:', uploadDir);
    }
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en http://localhost:${this.port}`);
    });
  }
}