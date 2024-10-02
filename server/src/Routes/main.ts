import { Router ,RequestHandler,Request, Response, NextFunction } from 'express';
import mainRoute from '../controllers/main';
const defaultRoute:Router = Router();


defaultRoute.post('/login', mainRoute.login as RequestHandler);
defaultRoute.get('/',mainRoute.home as RequestHandler);
defaultRoute.post("/signup",mainRoute.postSignup as RequestHandler);

export default defaultRoute;