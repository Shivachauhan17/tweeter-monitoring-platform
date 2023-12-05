import { Router ,RequestHandler,Request, Response, NextFunction } from 'express';
import mainRoute from '../controllers/main';
import passport from "passport";
const defaultRoute:Router = Router();



defaultRoute.get('/',mainRoute.home as RequestHandler);
defaultRoute.post("/login",passport.authenticate("local"
,{failureRedirect: '/',successRedirect:'/login' }))
// defaultRoute.get("/logout",mainRoute.getLogout)
defaultRoute.post("/signup",mainRoute.postSignup as RequestHandler)

export default defaultRoute;