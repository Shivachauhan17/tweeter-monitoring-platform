import { Strategy as LocalStrategy } from 'passport-local';
import { Document } from 'mongoose';
import { PassportStatic } from 'passport';
import User, { IUser } from '../models/user'; // Assuming you have a User interface or type
import { validPassword } from '../lib/passwordUtils';

type serialize=IUser|any;

export default function (passport:PassportStatic):void {
  passport.use(new LocalStrategy( async (username, password, done) => {
    console.log('username:',username)
    console.log("password:",password)

    await User.findOne({ username: username })
        .then((user) => {
            if (!user) { return done(null, false) }
            
            const isValid = validPassword(password, user.salt, user.password);
            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => {
            done(err);
        });

    }))
    passport.serializeUser((user:serialize, done) => {
    done(null, user._id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      console.log(user)
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
    
    }
    