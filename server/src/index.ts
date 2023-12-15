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

import mainRoute from './Routes/main';

dotenv.config()
connectDB();
const app:Application=express();

app.use(logger('dev'));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials:true
}));

app.use(compression());
app.use(express.urlencoded({extended:true}))
app.use(express.json())

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
          maxAge:1000*60*60*24
        }    
    })
    )


passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use('/',mainRoute);

app.listen(8000,()=>{
    console.log("server is running you better catch it")
})