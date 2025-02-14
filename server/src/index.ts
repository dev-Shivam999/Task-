 import express, {  Request, Response } from 'express'
const app = express();
import cors from 'cors'
import { DB } from './db/db';
import { Router } from './Router/Router';
const port = 3000;
import cookieParser from 'cookie-parser'


DB()
app.use(cors({
  origin: `${process.env.URL}`,
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