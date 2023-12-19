import mongoose,{ Schema,Document } from "mongoose";

export interface IUserKeyword extends Document{
    admin_user:string,
    username:string,
    keyword:string,
    is_keyword:boolean,
};

const UserKeyWordSchema:Schema=new Schema({
    admin_user:{type:String,required:true},
    username:{type:String},
    keyword:{type:String},
    is_keyword:{type:Boolean,required:true}
});

export default mongoose.model<IUserKeyword>('Userkeyword',UserKeyWordSchema);