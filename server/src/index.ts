import express,{Request, Response, NextFunction} from 'express';
import { Application } from 'express';

import MongoStore from 'connect-mongo';
import compression from 'compression';
import cors from 'cors';
import connectDB from './config/database';
import dotenv from 'dotenv';
import logger from 'morgan';
import session from 'express-session';
import passport from 'passport';
import passportConfig from './config/passport';
import path from 'path';

import mainRoute from './Routes/main';
import dataRoute from './Routes/data';

dotenv.config()
connectDB();
const app:Application=express();
// app.use(express.static(path.join(__dirname, 'dist')));

app.use(logger('dev'));
app.use(cors({
  origin: 'https://tweeter-monitoring-platform.vercel.app',
  credentials:true
}));

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set("trust proxy", 1);

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,//don't save session is unmodified
        saveUninitialized:true,//don't create session untill something is stores
        store: MongoStore.create({
          mongoUrl: "mongodb+srv://Shivag:shivashiva@cluster0.mz5u2w1.mongodb.net/tweeter?retryWrites=true&w=majority",
          collectionName: 'sessions'
        }),
        cookie:{
          maxAge:1000*60*60*24,
          secure: true,
        sameSite: "none" 
        }    
    })
    )


passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

// app.get('*',(req,res)=>{
//   res.sendFile(__dirname+ '/dist'+'/index.html')
// })
app.use('/',mainRoute);
app.use('/',dataRoute);

app.listen(8000,()=>{
    console.log("server is running you better catch it")
})
