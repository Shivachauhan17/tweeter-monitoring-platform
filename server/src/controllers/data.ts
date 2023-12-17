import { Request, Response, NextFunction } from 'express';
import Tweet from '../models/tweets';
import {IUser} from '../models/user';

const dataController={
    getMyAllTweets:async(req:Request,res:Response,next:NextFunction)=>{
        try{
            // if(req.user!==null && req.user!==undefined){
                // const data=await Tweet.find({label:{$ne:null},admin_user:(req.user as IUser).username});
                const data=await Tweet.find({label:{$ne:null},admin_user:"shiva"});
                return res.status(200).json({data:data});
            // }
            // return res.status(200).json({data:""});
            }
        
        catch(err){
            console.log(err);
            return res.status(500).json({data:""});
        }
    },
}

export default dataController;