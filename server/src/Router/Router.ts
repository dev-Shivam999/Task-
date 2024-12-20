import express from 'express';
import { Dashboard } from '../controllers/Dashboard';
import { Login } from '../controllers/Login';
import { Sign } from '../controllers/Sign';
import { List } from '../controllers/List';
import { Task } from '../controllers/Task';
import { UpdateColor } from '../controllers/UpdateColor';
import { Drag } from '../controllers/Drag';
import { Profile } from '../controllers/Profile';
import { UpdateProfile } from '../controllers/UpdateProfile';
import { TaskApi } from '../controllers/TaskApi';
import { TaskFile } from '../controllers/taskFile';


export const Router=express.Router();


//@ts-ignore
Router.get('/Dashboard', Dashboard)
//@ts-ignore
Router.get('/Profile', Profile)
Router.post('/TaskFile', TaskFile)
//@ts-ignore
Router.post('/TaskApi', TaskApi)
//@ts-ignore
Router.post('/Login', Login) 
//@ts-ignore
Router.post('/Sign', Sign) 
Router.post('/UpdateProfile', UpdateProfile) 
Router.post('/List', List) 
Router.post('/TaskAdd', Task) 
Router.post('/Drag', Drag) 
Router.put('/UpdateColor', UpdateColor) 