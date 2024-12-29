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
import { Calendar } from '../controllers/Calender';
import { ShowSettings } from '../controllers/ShowSetting';
import { CoverImg } from '../controllers/CoverImg';
import { Refer } from '../controllers/Refer';
import { Friend } from '../controllers/Friend';
import { Auth } from '../utils/Auth/Auth';
import { Mail } from '../controllers/Mail';
import { TableAdd } from '../controllers/TableAdd';


export const Router = express.Router();


//@ts-ignore
Router.get('/Dashboard', Auth, Dashboard)

//@ts-ignore
Router.get('/Friend', Auth, Friend)
//@ts-ignore
Router.post('/ShowSettings', Auth, ShowSettings)
//@ts-ignore
Router.post('/CoverImg', Auth, CoverImg)
//@ts-ignore
Router.post('/Refer',Auth, Refer)
//@ts-ignore
Router.post('/TableAdd', Auth, TableAdd)
//@ts-ignore
Router.get('/Calender', Auth, Calendar)
//@ts-ignore
Router.get('/Dashboard1', Auth, Dashboard1)
//@ts-ignore
Router.get('/Table', Auth, Table)
//@ts-ignore
Router.get('/Profile', Auth, Profile)
//@ts-ignore
Router.get('/Graph', Auth, Graph)
//@ts-ignore
Router.post('/TaskApi', TaskApi)
//@ts-ignore
Router.post('/Login', Login)
//@ts-ignore
Router.post('/Sign', Sign)
//@ts-ignore
Router.post('/Email', Auth, Mail)


Router.post('/TaskFile', TaskFile)
Router.post('/UpdateProfile', UpdateProfile)
Router.post('/List', List)
Router.post('/TaskAdd', Task)
Router.post('/Drag', Drag)
Router.put('/UpdateColor', UpdateColor)

Router.post('/Timmer', Timmer)