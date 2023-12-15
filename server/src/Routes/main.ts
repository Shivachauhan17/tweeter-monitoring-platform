import { Router ,RequestHandler,Request, Response, NextFunction } from 'express';
import mainRoute from '../controllers/main';
const defaultRoute:Router = Router();

defaultRoute.all('/successLogin',mainRoute.successRedirect as RequestHandler);
defaultRoute.all('/failureLogin',mainRoute.failureRedirect as RequestHandler);
defaultRoute.post('/login', mainRoute.login as RequestHandler);
defaultRoute.get('/',mainRoute.home as RequestHandler);
defaultRoute.post("/signup",mainRoute.postSignup as RequestHandler);

export default defaultRoute;