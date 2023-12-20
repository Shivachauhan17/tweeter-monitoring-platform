import mongoose,{ Schema,Document } from "mongoose";
import { ITweets } from "./tweets";

interface AlTweet extends ITweets{
    id:string
}

const AlTweetsSchema:Schema=new Schema({
    admin_user:{type:String,required:true},
    username:{type:String},
    keyword:{type:String},
    profile:{type:String,required:true},
    tweet:{type:String,required:true},
    label:{type:String,required:true},
    tweet_link:{type:String,required:true},
    is_keyword:{type:Boolean,required:true},
    utcTime: { type: Date, required: true, default: new Date() },
    id:{type:String,required:true}

});

export default mongoose.model<AlTweet>('AlTweet',AlTweetsSchema);