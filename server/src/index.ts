import express from 'express';
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
    credentials:true,
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
          mongoUrl: process.env.DB_STRING as string,
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



app.listen(8080,()=>{
    console.log("server is running you better catch it")
})