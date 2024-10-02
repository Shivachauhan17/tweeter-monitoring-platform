import express,{Request, Response, NextFunction} from 'express';
import { Application } from 'express';

import cors from 'cors';
import connectDB from './config/database';
import dotenv from 'dotenv';
import logger from 'morgan';
import jwt from 'jsonwebtoken'
import cookieParser  from 'cookie-parser'

import mainRoute from './Routes/main';
import dataRoute from './Routes/data';
import { Cookie } from 'express-session';

dotenv.config()
connectDB();
const app:Application=express();
// app.use(express.static(path.join(__dirname, 'dist')));

app.use(logger('dev'));
app.use(cors({
  origin: ['https://tweeter-monitoring-platform.vercel.app',"http://localhost:5173"],
  credentials:true
}));

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set("trust proxy", 1);

app.use(cookieParser())

// Define your TokenData interface
interface TokenData {
  username: string;
  id: string;
  // Add other properties as needed
}

// Extend the Request interface to include user property
export interface IRequest extends Request {
  user?: TokenData;
}

app.use('/',mainRoute);
app.use(async (req: Request, res: Response, next: NextFunction)=> {
  try {
    console.log(req.cookies)
      const token = req.cookies.access_token;
      console.log("token:",token)
      if (!token) {
          return res.status(401).json({ error: 'No token provided.' });
      }

      let tokendata: TokenData | null = null;
      try {
          tokendata = await jwt.verify(token, "Secret") as TokenData;
      } catch (e) {
          console.log(e);
          return res.status(400).json({ msg: 'Wrong credentials.' });
      }

      if (!tokendata) {
          return res.status(400).json({ msg: 'Wrong credentials.' });
      }

      req.user = tokendata; // Now req.user is properly typed
      console.log("req.user:", req.user);
      next();
  } catch (e) {
      console.log(e);
      return res.status(500).json({ msg: 'Server side errors' });
  }
})

app.use('/',dataRoute);

app.listen(8000,()=>{
    console.log("server is running you better catch it")
})
