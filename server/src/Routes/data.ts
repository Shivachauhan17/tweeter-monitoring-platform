import { Router ,RequestHandler,Request, Response, NextFunction } from 'express';
import dataController from '../controllers/data';
const dataRoute:Router = Router();

dataRoute.post('/getMyAllTweets',dataController.getMyAllTweets as RequestHandler);
dataRoute.post('/get_vNvPercentage',dataController.get_vNvPercentage as RequestHandler);
dataRoute.post('/addUser',dataController.addUser as RequestHandler);
dataRoute.post('/deleteUser',dataController.deleteUser as RequestHandler);


export default dataRoute;