import express, { Request, Response } from 'express';
import cors from 'cors';
import { DB } from './db/db';
import { Router } from './Router/Router';
import cookieParser from 'cookie-parser';
import os from 'os';
import cluster from 'cluster';
import dotenv from 'dotenv';
import path from 'path';
import ejs from 'ejs';

dotenv.config();

const port = process.env.PORT || 3000;
const cpuCount = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`);

  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Spawning a new one...`);
    cluster.fork();
  });
} else {
  const app = express();
  DB();

  app.use(
    cors({
      origin: process.env.URL,
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views")); 

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api', Router);

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
  });

  app.listen(port, () => {
    console.log(`Worker ${process.pid} - Server is running on http://localhost:${port}`);
  });
}
