import { Router ,RequestHandler,Request, Response, NextFunction } from 'express';
import dataController from '../controllers/data';
const dataRoute:Router = Router();

dataRoute.get('/getMyAllTweets',dataController.getMyAllTweets as RequestHandler);

export default dataRoute;