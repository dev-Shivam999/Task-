import express from 'express';
import { Dashboard } from '../controllers/Dashboard';
import { Login } from '../controllers/Login';
import { Sign } from '../controllers/Sign';
import { List } from '../controllers/List';


export const Router=express.Router();


//@ts-ignore
Router.get('/Dashboard', Dashboard)
//@ts-ignore
Router.post('/Login', Login) 
//@ts-ignore
Router.post('/Sign', Sign) 
Router.post('/List', List) 