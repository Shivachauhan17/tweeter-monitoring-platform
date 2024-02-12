"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_local_1 = require("passport-local");
const user_1 = __importDefault(require("../models/user")); // Assuming you have a User interface or type
const passwordUtils_1 = require("../lib/passwordUtils");
function default_1(passport) {
    passport.use(new passport_local_1.Strategy((username, password, done) => __awaiter(this, void 0, void 0, function* () {
        console.log('username:', username);
        console.log("password:", password);
        yield user_1.default.findOne({ username: username })
            .then((user) => {
            if (!user) {
                return done(null, false);
            }
            const isValid = (0, passwordUtils_1.validPassword)(password, user.salt, user.password);
            if (isValid) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
            .catch((err) => {
            done(err);
        });
    })));
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_1.default.findById(id);
            console.log(user);
            done(null, user);
        }
        catch (err) {
            done(err, null);
        }
    }));
}
exports.default = default_1;
