import { Request, Response, NextFunction } from 'express';
// import passport from 'passport';
import validator from 'validator';
import User from '../models/user';
// import { json } from 'body-parser';
import { genPassword,validPassword} from '../lib/passwordUtils';
import {IUser} from '../models/user';
import passport from 'passport';
import jwt from 'jsonwebtoken'




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
            if(!req.body.password || !req.body.username || !req.body.confirm_password){
                return res.status(411).json({msg:"wrong inputs"})
            }
            console.log(req.body.password ,req.body.username ,req.body.confirm_password)
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
                return res.status(403).json({error:["user already exists"],user:null})
            }

            const saltHash=genPassword(req.body.password);
            console.log(saltHash)
            const salt:string=saltHash.salt;
            const hash:string=saltHash.hash;

            const newUser:IUser=new User({
                email:"",
                username:req.body.username,
                password:hash,
                salt:salt,
            });
            const savedUser=await newUser.save();
            const userForToken = {
                username: savedUser.username,
                id: savedUser.id,
              }
            let token=null
            
            token=jwt.sign(userForToken,"Secret")
            if(!token){
                return res.status(500).json({msg:null,err:"Authorization Assignment failed."})
            }

            res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
              }).status(200).send({username:req.body.username})
        }
        catch(err){
            console.log("error in postSignup:",err);
            return res.status(500).json({error:"some unexpacted error",user:null})
        }
    },

    login:async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;
            console.log(username,password)
            if (!username || !password) {
                return res.status(411).json({ msg: null, err: "Some fields are missing from the request." });
            }
    
            const user = await User.findOne({ username:username });
            if (!user) {
                return res.status(401).json({ msg: "No such user exists." });
            }
    
            const passwordCorrect = validPassword(password, user.password, user.salt);
            console.log("passwordCorrect:",passwordCorrect)
            if (!passwordCorrect) {
                return res.status(401).json({ error: 'Invalid username or password.' });
            }
    
            const userForToken = {
                username: user.username, 
                id: user.id,
            };
    
            const token = jwt.sign(userForToken, "Secret");
            if (!token) {
                return res.status(500).json({ msg: null, err: "Authorization assignment failed." });
            }
    
            return res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            }).status(200).send({ username: user.username });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ err: 'An error occurred during login.' });
        }
    }


}
export default mainRoute;