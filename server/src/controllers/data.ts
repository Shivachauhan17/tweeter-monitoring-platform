import { Request, Response, NextFunction } from 'express';
import Tweet from '../models/tweets';
import {IUser} from '../models/user';

export interface SingleTweet{
    label:string,
    tweet:string,
    profile_pic:string,
    tweet_id:string
};



const dataController={
    getMyAllTweets:async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const pageLimit=5;
            // if(req.user!==null && req.user!==undefined){
                // const data=await Tweet
                //             .find({label:{$ne:null},admin_user:(req.user as IUser).username})
                //             .sort({utcTime:-1})
                //             .skip((req.body.page-1)*pageLimit)
                //             .limit(pageLimit).
                //             exec();

                const data=await Tweet
                            .find({label:{$ne:null},admin_user:'shiva',username:req.body.monitoringUser})
                            .sort({utcTime:-1})
                            .skip((req.body.page-1)*pageLimit)
                            .limit(pageLimit).
                            exec();
                
                if (data.length>0){
                    const newdata:SingleTweet[]=[];

                    data.forEach((element)=>{
                        let obj:SingleTweet={
                            label:"",
                            tweet:"",
                            profile_pic:"",
                            tweet_id:""
                        };

                        obj.label=element.label;
                        obj.tweet=element.tweet;
                        obj.profile_pic=element.profile;
                        obj.tweet_id=element._id;

                        newdata.push(obj);
                        
                    })
                    return res.status(200).json({data:newdata});

                }
                
                return res.status(500).json({data:""});
            // }
            // return res.status(200).json({data:""});
            }
        
        catch(err){
            console.log(err);
            return res.status(500).json({data:""});
        }
    },

    get_vNvPercentage:async (req:Request,res:Response,next:NextFunction)=>{
        try{
            const cutoffDate = new Date();
            cutoffDate.setHours(cutoffDate.getHours() - 24);
            let violents = await Tweet.countDocuments(
                { 
                    utcTime: { $gte: cutoffDate },
                    label:'violent',
                    admin_user:'shiva',
                    username:req.body.monitoringUser 
                })
                .exec();

            let nonViolents=await Tweet.countDocuments(
                { 
                    utcTime: { $gte: cutoffDate },
                    label:'non-violent',
                    admin_user:'shiva',
                    username:req.body.monitoringUser 
                })
                .exec();

            violents=(violents/(violents+nonViolents))*100;
            nonViolents=(nonViolents/(violents+nonViolents))*100;

            return res.status(200).json({violent:violents,nViolent:nonViolents});

        }
        catch(err){
            console.log(err);
            return res.status(500).json({data:{}});
        }
    },
    addUser:async (req:Request,res:Response,next:NextFunction)=>{},

    deleteUser:async (req:Request,res:Response,next:NextFunction)=>{},
    

}

export default dataController;