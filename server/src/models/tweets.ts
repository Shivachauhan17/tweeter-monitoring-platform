import mongoose,{ Schema,Document } from "mongoose";

export type LabelType="violent" | "non-violent";

export interface ITweets extends Document{
    admin_user:string,
    username:string,
    keyword:string,
    profile:string,
    tweet:string,
    label:LabelType,
    tweet_link:string,
    is_keyword:boolean,
    utcTime: Date;
};

const TweetsSchema:Schema=new Schema({
    admin_user:{type:String,required:true},
    username:{type:String,required:true},
    keyword:{type:String,required:true},
    profile:{type:String,required:true},
    tweet:{type:String,required:true},
    label:{type:String,required:true},
    tweet_link:{type:String,required:true},
    is_keyword:{type:Boolean,required:true},
    utcTime: { type: Date, required: true, default: new Date() }

});

export default mongoose.model<ITweets>('Tweet',TweetsSchema);