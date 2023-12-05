import {Strategy as LocalStrategy} from 'passport-local';
import User from '../models/user';
import { validPassword } from '../lib/passwordUtils';
import { PassportStatic } from 'passport';
import { Types } from 'mongoose';

// interface UserDocument extends Document {
//   _id: Types.ObjectId;
// }
type UserIdentifier = string | Types.ObjectId;


export default function(passport:PassportStatic):void{
    passport.use(
        new LocalStrategy(async(username:string,password:string,done)=>{
            
            try{
                const user=await User.findOne({username:username});
                
                if(!user){
                    return done(null,false);
                }

                const isValid=validPassword(password,user.salt,user.password);
                if (isValid) {
                    return done(null, user);
                  } 
                else {
                    return done(null, false);
                  }
            }
            catch (err) {
                done(err);
              }
        }
        )
    );

        passport.serializeUser((user: any, done) => {
            // Serialize user information into a format that can be stored in the session
            console.log("in serialize:",user)
            done(null, user._id.toString());
          });

        passport.deserializeUser(async(userid:UserIdentifier,done)=>{
            try{
                const user=await User.findById(userid);
                if(!user){
                    return done(null,false);
                }
            }
            catch(err){
                console.log("error in deserialize:", err)
                done(err,null);
            }
        });
    
}

