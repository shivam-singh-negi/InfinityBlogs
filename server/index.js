import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import Router from './routes/route.js'
import cors from 'cors'
import bodyParser from 'body-parser';
 dotenv.config();

const app=express();
app.use(cors());
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',Router);

const PORT= 8000;
app.listen(PORT,()=>console.log('server is running at port',{PORT}))
const userName=process.env.DB_UserName;
const password=process.env.DB_Password;
Connection(userName,password);