import { Request, Response, NextFunction } from 'express';
// import passport from 'passport';
import validator from 'validator';
import User from '../models/user';
// import { json } from 'body-parser';
import { genPassword} from '../lib/passwordUtils';
import {IUser} from '../models/user';
import passport from 'passport';





const mainRoute={

    home:(req:Request,res:Response,next:NextFunction)=>{
        try{
            if(req.user!==null && req.user!==undefined){
            return res.status(200).json({user:(req.user as IUser).username});
            }
            return res.status(200).json({user:""});
            }
        
        catch(err){
            console.log(err);
            return res.status(500).json({user:""});
        }
    },

    postSignup:async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const validationErrors:string[]=[];
            if(req.body.password.length<8){
                validationErrors.push("password must be atleast 8 characters long");
            }

            if(req.body.password!==req.body.confirm_password){
                validationErrors.push("passwords do not match");
            }

            if(validationErrors.length){
                return res.json({error:validationErrors,user:null});
            }

            
            const existingUser=await User.findOne({username:req.body.username});
            if(existingUser){
                return res.json({error:["user already exists"],user:null})
            }

            const saltHash=genPassword(req.body.password);
            const salt:string=saltHash.salt;
            const hash:string=saltHash.hash;

            const newUser:IUser=new User({
                email:"",
                username:req.body.username,
                password:hash,
                salt:salt,
            });
            await newUser.save();
            return res.json({error:null,user:req.body.username})
        }
        catch(err){
            console.log("error in postSignup:",err);
            return res.json({error:"some unexpacted error",user:null})
        }
    },

    login:passport.authenticate('local', {successRedirect:"/successLogin",failureRedirect:"/failureLogin"}),

    successRedirect:(req:Request,res:Response,next:NextFunction)=>{
        console.log(req.user)
        if(req.user!==null && req.user!==undefined){
            console.log("okk")
         return res.status(200).json({user:(req.user as IUser).username})}
         
         res.status(200).json({user:null})
         
    },

    failureRedirect:(req:Request,res:Response,next:NextFunction)=>{
        res.status(500).json({user:null})
    }

}
export default mainRoute;