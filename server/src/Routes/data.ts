import { Router ,RequestHandler,Request, Response, NextFunction } from 'express';
import dataController from '../controllers/data';
const dataRoute:Router = Router();
dataRoute.post('/getAllUser',dataController.getAllUser as  RequestHandler)
dataRoute.post('/getAllKeywords',dataController.getAllKeywords as RequestHandler)
dataRoute.post('/get_vNvPercentage',dataController.get_vNvPercentage as RequestHandler);
dataRoute.post('/addUser',dataController.addUser as RequestHandler);
dataRoute.post('/deleteUser',dataController.deleteUser as RequestHandler);
dataRoute.post('/addKeyword',dataController.addKeyword as RequestHandler);
dataRoute.post('/deleteKeyword',dataController.deleteKeyword as RequestHandler);
dataRoute.post('/right4al',dataController.right4al as RequestHandler);
dataRoute.post('/reverse4al',dataController.reverse4al as RequestHandler);
dataRoute.post('/getMyAllTweets',dataController.getMyAllTweets as RequestHandler);
dataRoute.post('/getDateFilteredTweets',dataController.getDateFilteredTweets as RequestHandler);
dataRoute.post('/violentFilterTweets',dataController.violentFilterTweets as RequestHandler);

dataRoute.post('/getMyMonitoringUsers',dataController.getMyMonitoringUsers as RequestHandler);


export default dataRoute;