import { Request, Response, NextFunction } from 'express';
// import passport from 'passport';
import validator from 'validator';
import User from '../models/user';
// import { json } from 'body-parser';
import { genPassword} from '../lib/passwordUtils';
import {IUser} from '../models/user';

interface reqUser extends IUser{
    _id:string,
    __v:number
}
interface CustomRequest extends Request {
    user?: reqUser;
  }


const mainRoute={

    home:(req:CustomRequest,res:Response,next:NextFunction)=>{
        try{
            if(req.user!==null && req.user!==undefined){
            res.json({user:req.user.username})
            }
            else{
            res.json({user:""})
            }
        }
        catch(err){
            console.log(err);
            res.json({user:""});
        }
    },

    postSignup:async(req:CustomRequest,res:Response,next:NextFunction)=>{
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
            await newUser.save()
            return res.json({error:null,user:req.body.username})
        }
        catch(err){
            console.log("error in postSignup:",err);
            return res.json({error:"some unexpacted error",user:null})
        }
    }

}
export default mainRoute;