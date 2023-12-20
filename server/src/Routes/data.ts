import { Router ,RequestHandler,Request, Response, NextFunction } from 'express';
import dataController from '../controllers/data';
const dataRoute:Router = Router();

dataRoute.post('/get_vNvPercentage',dataController.get_vNvPercentage as RequestHandler);
dataRoute.post('/addUser',dataController.addUser as RequestHandler);
dataRoute.post('/deleteUser',dataController.deleteUser as RequestHandler);
dataRoute.post('/addKeyword',dataController.addKeyword as RequestHandler);
dataRoute.post('/deleteKeyword',dataController.deleteKeyword as RequestHandler);
dataRoute.post('/right4al',dataController.right4al as RequestHandler);
dataRoute.post('/reverse4al',dataController.reverse4al as RequestHandler);
dataRoute.post('/getMyAllTweets',dataController.getMyAllTweets as RequestHandler);


export default dataRoute;