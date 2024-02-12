import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Tweet from '../models/tweets';
import {IUser} from '../models/user';
import Userkeyword from '../models/user_keyword';
import AlTweet from '../models/alTweet';

export interface SingleTweet{
    label:string,
    tweet:string,
    profile_pic:string,
    tweet_id:string,
};

export interface AllKeywords{ label: string; }

export interface MyMUser{
    profile:string,
    person:string
};


const dataController={
    getAllUser:async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const result=await Userkeyword.distinct('username', { is_keyword: false,admin_user:req.body.username })
            res.status(200).json({data:result});
        }
        catch(err){
            console.log(err);
            return res.status(500).json({data:null});
        }
    },
    getAllKeywords:async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const result=await Userkeyword.distinct('keyword', { is_keyword: true,admin_user:req.body.admin_user})
            const newData:AllKeywords[]=[]
            if(result.length>0){
                for(let i=0;i<result.length;i++){
                const obj={label:""}
                obj.label=result[i]
                newData.push(obj)
            }
            return res.status(200).json({data:newData})
            }
            res.status(200).json({data:null});
        }
        catch(err){
            console.log(err);
            return res.status(500).json({data:null});
        }
    },
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
            
            if(req.body.isUserMonitor){
                console.log(req.body.monitoringUser)
                console.log(req.body.admin_user)

                const data=await Tweet
                            .find({label:{$ne:null},admin_user:req.body.admin_user,username:req.body.monitoringUser,is_keyword:false})
                            .sort({utcTime:-1})
                            .skip((req.body.page-1)*pageLimit)
                            .limit(pageLimit).
                            exec();
                console.log(data)
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
                
                return res.status(200).json({data:null});}
                else{
                    const data=await Tweet
                    .find({label:{$ne:null},admin_user:req.body.admin_user,keyword:req.body.monitoringUser,is_keyword:true})
                    .sort({utcTime:-1})
                    .skip((req.body.page-1)*pageLimit)
                    .limit(pageLimit).
                    exec();
                    console.log(data)
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
                    
                    return res.status(200).json({data:null});
                }
            }
        
        catch(err){
            console.log(err);
            return res.status(500).json({data:""});
        }
    },

    get_vNvPercentage:async (req:Request,res:Response,next:NextFunction)=>{
        try{
            // const cutoffDate = new Date();
            // cutoffDate.setHours(cutoffDate.getHours() - 24);
            if(req.body.isUserMonitor){
                let violents = await Tweet.countDocuments(
                    { 
                        // utcTime: { $gte: cutoffDate },
                        label:'violent',
                        admin_user:req.body.admin_user,
                        username:req.body.monitoringUser 
                    })
                    .exec();
                

                let nonViolents=await Tweet.countDocuments(
                    { 
                        // utcTime: { $gte: cutoffDate },
                        label:'non-violent',
                        admin_user:req.body.admin_user,
                        username:req.body.monitoringUser 
                    })
                    .exec();
                
                let tempViolents=violents
                violents=(violents/(violents+nonViolents))*100;
                nonViolents=(nonViolents/(tempViolents+nonViolents))*100;

                return res.status(200).json({violent:violents,nViolent:nonViolents});
            }
            else{
                let violents = await Tweet.countDocuments(
                    { 
                        // utcTime: { $gte: cutoffDate },
                        label:'violent',
                        admin_user:req.body.admin_user,
                        keyword:req.body.monitoringUser 
                    })
                    .exec();
                
    
                let nonViolents=await Tweet.countDocuments(
                    { 
                        // utcTime: { $gte: cutoffDate },
                        label:'non-violent',
                        admin_user:req.body.admin_user,
                        keyword:req.body.monitoringUser 
                    })
                    .exec();
                
                let tempViolents=violents
                violents=(violents/(violents+nonViolents))*100;
                nonViolents=(nonViolents/(tempViolents+nonViolents))*100;
    
                return res.status(200).json({violent:violents,nViolent:nonViolents});
            }

        }
        catch(err){
            console.log(err);
            return res.status(500).json({data:{}});
        }
    },
    addUser:async (req:Request,res:Response,next:NextFunction)=>{
        try{
            const newDoc=new Userkeyword({
                admin_user:req.body.admin_user,
                username:req.body.userToAdd,
                keyword:"",
                is_keyword:false
            });
            await newDoc.save();
            res.status(200).json({data:newDoc});
        }
        catch(err){
            console.log(err);
            return res.status(500).json({data:{}});
        }
    },

    deleteUser:async (req:Request,res:Response,next:NextFunction)=>{
        try{
            const data=await Userkeyword.deleteOne({username:req.body.userToDel,admin_user:req.body.admin_user});
            res.status(200).json({data:data});
        }
        catch(err){
            console.log(err);
            return res.status(500).json({data:null});
        }
    },

    addKeyword:async (req:Request,res:Response,next:NextFunction)=>{
        try{
            const newDoc=new Userkeyword({
                admin_user:req.body.admin_user,
                username:"",
                keyword:req.body.keywordToAdd,
                is_keyword:true
            });
            await newDoc.save();
            res.status(200).json({data:newDoc});
        }
        catch(err){
            console.log(err);
            return res.status(500).json({data:{}});
        }
    },
    
    deleteKeyword:async (req:Request,res:Response,next:NextFunction)=>{
        try{
            const data=await Userkeyword.deleteOne({keyword:req.body.keywordToDel,admin_user:req.body.admin_user});
            res.status(200).json({data:data});
        }
        catch(err){
            console.log(err);
            return res.status(500).json({data:null});
        }
    },
    right4al:async (req:Request,res:Response,next:NextFunction)=>{
        try{
            const result = await Tweet.findById(new mongoose.Types.ObjectId(req.body.id)).select('-_id');
            
            const data={
                admin_user:result?.admin_user,
                username:result?.username,
                keyword:result?.keyword,
                profile:result?.profile,
                tweet:result?.tweet,
                tweet_link:result?.tweet_link,
                is_keyword:result?.is_keyword,
                utcTime:result?.utcTime,
                id:req.body.id,
                label:result?.label
            };

            await AlTweet.findOneAndUpdate({id:req.body.id},data, {
                upsert: true,
                new: true,    
              }); 
    
            res.status(200).json({data:data});
            }
            catch(err){
                console.log(err);
                return res.status(500).json({data:{}});
            }
    },
    reverse4al:async (req:Request,res:Response,next:NextFunction)=>{
        try{
        const result = await Tweet.findById(new mongoose.Types.ObjectId(req.body.id)).select('-_id');
        let labelValue="";
        if(result){
            labelValue=result.label==="violent"?"non-violent":"violent";
            console.log(labelValue)
        }
        const data={
            admin_user:result?.admin_user,
            username:result?.username,
            keyword:result?.keyword,
            profile:result?.profile,
            tweet:result?.tweet,
            tweet_link:result?.tweet_link,
            is_keyword:result?.is_keyword,
            utcTime:result?.utcTime,
            id:req.body.id,
            label:labelValue
        };

        await AlTweet.findOneAndUpdate({id:req.body.id},data, {
            upsert: true,
            new: true,   
            setDefaultsOnInsert: true, 
          }); 

        res.status(200).json({data:data});
        }
        
        catch(err){
            console.log(err);
            return res.status(500).json({data:{}});
        }
    },

    getDateFilteredTweets:async(req:Request,res:Response,next:NextFunction)=>{
        console.log(req.body);
        try{
            const pageLimit=5;
            // if(req.user!==null && req.user!==undefined){
                // const data=await Tweet
                //             .find({label:{$ne:null},admin_user:'shiva',username:req.body.monitoringUser,
                                //     utcTime:{
                                //         $gte:req.body.startDate,
                                //         $lte:req.body.endDate
                                //             }
                                // })
                //             .sort({utcTime:-1})
                //             .skip((req.body.page-1)*pageLimit)
                //             .limit(pageLimit).
                //             exec();

                const data=await Tweet
                            .find({label:{$ne:null},admin_user:req.body.admin_user,username:req.body.monitoringUser
                                // utcTime:{
                                //     $gte:new Date(req.body.startDate),
                                //     $lte:new Date(req.body.endDate)
                                //         }
                            })
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
    violentFilterTweets:async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const pageLimit=5;
            // if(req.user!==null && req.user!==undefined){
                // const data=await Tweet
                //             .find({label:{$ne:null},admin_user:(req.user as IUser).username})
                //             .sort({utcTime:-1})
                //             .skip((req.body.page-1)*pageLimit)
                //             .limit(pageLimit).
                //             exec();

                if(req.body.isUserMonitor){
                const data=await Tweet
                            .find({label:'violent',admin_user:req.body.admin_user,username:req.body.monitoringUser})
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
                    return res.status(200).json({data:newdata});}
                    return res.status(200).json({data:null})
                }
                else{
                    const data=await Tweet
                            .find({label:'violent',admin_user:req.body.admin_user,keyword:'riot'})
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
                    return res.status(200).json({data:newdata});}
                    return res.status(200).json({data:null})
                }
                    
            }
        
        catch(err){
            console.log(err);
            return res.status(500).json({data:""});
        }
    },

    getMyMonitoringUsers:async(req:Request,res:Response,next:NextFunction)=>{
        try{
            
                const data=await Userkeyword.distinct('username',{admin_user:req.body.admin_user,is_keyword:false});
                // console.log(data)
                const newdata:MyMUser[]=[];
                if (data.length>0){
                    

                    
                    for(let i=0;i<data.length;i++){
                        let obj:MyMUser={
                            person:"",
                            profile:""
                        };
                        const doc=await Tweet.findOne({username:data[i]});

                        if(doc){
                            obj.person=data[i];
                            obj.profile=doc.profile;
                            newdata.push(obj);
                        }
                        else{
                            obj.person=data[i];
                            obj.profile="";
                            newdata.push(obj);
                        }
                    };   
                    
                    return res.status(200).json({data:newdata});

                }
                
                return res.status(200).json({data:[]});
            // }
            // return res.status(200).json({data:""});
            }
        
        catch(err){
            console.log(err);
            return res.status(500).json({data:null});
        }
    },
}

export default dataController;