 import express, {  Request, Response } from 'express'
const app = express();
import cors from 'cors'
import { DB } from './db/db';
import { Router } from './Router/Router';
const port = 3000;
import cookieParser from 'cookie-parser'


DB()
app.use(cors({
  origin: ["http://localhost:5173", "http://192.168.1.18:5173",'http://172.18.112.1:5173/'],
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())

app.use('/api',Router)

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World');
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:port`);
});