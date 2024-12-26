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
import { Timmer } from '../controllers/Timmer';
import { Table } from '../controllers/Table';
import { Dashboard1 } from '../controllers/Dashboard1';
import { Graph } from '../controllers/Graph';
import {Calendar } from '../controllers/Calender';


export const Router=express.Router();


//@ts-ignore
Router.get('/Dashboard', Dashboard)
//@ts-ignore
Router.get('/Calender', Calendar)
//@ts-ignore
Router.get('/Dashboard1', Dashboard1)
//@ts-ignore
Router.get('/Table', Table)
//@ts-ignore
Router.get('/Profile', Profile)
//@ts-ignore
Router.get('/Graph', Graph)
Router.post('/TaskFile', TaskFile)
//@ts-ignore
Router.post('/TaskApi', TaskApi)
Router.post('/Timmer',Timmer)
//@ts-ignore
Router.post('/Login', Login) 
//@ts-ignore
Router.post('/Sign', Sign) 
Router.post('/UpdateProfile', UpdateProfile) 
Router.post('/List', List) 
Router.post('/TaskAdd', Task) 
Router.post('/Drag', Drag) 
Router.put('/UpdateColor', UpdateColor) 