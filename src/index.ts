import 'reflect-metadata';

import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import redoc from 'redoc-express';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import { container } from 'tsyringe';
import mongoose from 'mongoose';
import cors from 'cors';

import { CalculatorRouter } from './routes/calculator.router';

dotenv.config();

class WebServer {
  private _app: express.Application;
  private _mongoDBUri = process.env.DATABASE_URL || '';

  constructor() {
    this._app = express();
    this._app.use(cors());
    this.setServerOptions();
    this.createRoutes();
    this.startServer();
    this.createDocsAndSwagger();
    this.connectToDatabase();
  }

  private setServerOptions(): void {
    dotenv.config();
    this._app.use(express.text());
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: false }));
  }

  private createRoutes(): void {
    const calculatorRouter = container.resolve(CalculatorRouter);
    this._app.use('/api', calculatorRouter.router);
  }

  private startServer(): void {
    const PORT = process.env.PORT || 3000;
    this._app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }

  private createDocsAndSwagger(): void {
    let openapiYaml = fs.readFileSync('./openapi.yaml', 'utf8');
    openapiYaml = openapiYaml.replace('${API_BASE_URL}', process.env.baseURL || '');

    this._app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(undefined, {
      swaggerOptions: { url: `${process.env.baseURL}/openapi.yaml` }
    }));

    this._app.get('/openapi.yaml', (req, res) => {
      res.type('text/yaml').send(openapiYaml);
    });

    this._app.get('/docs', redoc({ title: 'API Docs', specUrl: '/openapi.yaml' }));
  }

  private async connectToDatabase(): Promise<void> {
    try {
      await mongoose.connect(this._mongoDBUri);
      console.log('MongoDB Connected');
    } catch (error) {
      console.error('MongoDB Connection Error:', error);
      process.exit(1);
    }
  }
}

const server = new WebServer();
