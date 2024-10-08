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
const mongoose_1 = __importDefault(require("mongoose"));
const tweets_1 = __importDefault(require("../models/tweets"));
const user_keyword_1 = __importDefault(require("../models/user_keyword"));
const alTweet_1 = __importDefault(require("../models/alTweet"));
;
;
const dataController = {
    getAllUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const result = yield user_keyword_1.default.distinct('username', { is_keyword: false, admin_user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.username });
            res.status(200).json({ data: result });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ data: null });
        }
    }),
    getAllKeywords: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        try {
            const result = yield user_keyword_1.default.distinct('keyword', { is_keyword: true, admin_user: (_b = req.user) === null || _b === void 0 ? void 0 : _b.username });
            const newData = [];
            if (result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    const obj = { label: "" };
                    obj.label = result[i];
                    newData.push(obj);
                }
                return res.status(200).json({ data: newData });
            }
            res.status(200).json({ data: null });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ data: null });
        }
    }),
    getMyAllTweets: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d, _e;
        try {
            const pageLimit = 5;
            // if(req.user!==null && req.user!==undefined){
            // const data=await Tweet
            //             .find({label:{$ne:null},admin_user:(req.user as IUser).username})
            //             .sort({utcTime:-1})
            //             .skip((req.body.page-1)*pageLimit)
            //             .limit(pageLimit).
            //             exec();
            if (req.body.isUserMonitor) {
                console.log(req.body.monitoringUser);
                console.log((_c = req.user) === null || _c === void 0 ? void 0 : _c.username);
                const data = yield tweets_1.default
                    .find({ label: { $ne: null }, admin_user: (_d = req.user) === null || _d === void 0 ? void 0 : _d.username, username: req.body.monitoringUser, is_keyword: false })
                    .sort({ utcTime: -1 })
                    .skip((req.body.page - 1) * pageLimit)
                    .limit(pageLimit).
                    exec();
                console.log(data);
                if (data.length > 0) {
                    const newdata = [];
                    data.forEach((element) => {
                        let obj = {
                            label: "",
                            tweet: "",
                            profile_pic: "",
                            tweet_id: ""
                        };
                        obj.label = element.label;
                        obj.tweet = element.tweet;
                        obj.profile_pic = element.profile;
                        obj.tweet_id = element._id;
                        newdata.push(obj);
                    });
                    return res.status(200).json({ data: newdata });
                }
                return res.status(200).json({ data: null });
            }
            else {
                const data = yield tweets_1.default
                    .find({ label: { $ne: null }, admin_user: (_e = req.user) === null || _e === void 0 ? void 0 : _e.username, keyword: req.body.monitoringUser, is_keyword: true })
                    .sort({ utcTime: -1 })
                    .skip((req.body.page - 1) * pageLimit)
                    .limit(pageLimit).
                    exec();
                console.log(data);
                if (data.length > 0) {
                    const newdata = [];
                    data.forEach((element) => {
                        let obj = {
                            label: "",
                            tweet: "",
                            profile_pic: "",
                            tweet_id: ""
                        };
                        obj.label = element.label;
                        obj.tweet = element.tweet;
                        obj.profile_pic = element.profile;
                        obj.tweet_id = element._id;
                        newdata.push(obj);
                    });
                    return res.status(200).json({ data: newdata });
                }
                return res.status(200).json({ data: null });
            }
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ data: "" });
        }
    }),
    get_vNvPercentage: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _f, _g, _h, _j;
        try {
            // const cutoffDate = new Date();
            // cutoffDate.setHours(cutoffDate.getHours() - 24);
            if (req.body.isUserMonitor) {
                let violents = yield tweets_1.default.countDocuments({
                    // utcTime: { $gte: cutoffDate },
                    label: 'violent',
                    admin_user: (_f = req.user) === null || _f === void 0 ? void 0 : _f.username,
                    username: req.body.monitoringUser
                })
                    .exec();
                let nonViolents = yield tweets_1.default.countDocuments({
                    // utcTime: { $gte: cutoffDate },
                    label: 'non-violent',
                    admin_user: (_g = req.user) === null || _g === void 0 ? void 0 : _g.username,
                    username: req.body.monitoringUser
                })
                    .exec();
                let tempViolents = violents;
                violents = (violents / (violents + nonViolents)) * 100;
                nonViolents = (nonViolents / (tempViolents + nonViolents)) * 100;
                return res.status(200).json({ violent: violents, nViolent: nonViolents });
            }
            else {
                let violents = yield tweets_1.default.countDocuments({
                    // utcTime: { $gte: cutoffDate },
                    label: 'violent',
                    admin_user: (_h = req.user) === null || _h === void 0 ? void 0 : _h.username,
                    keyword: req.body.monitoringUser
                })
                    .exec();
                let nonViolents = yield tweets_1.default.countDocuments({
                    // utcTime: { $gte: cutoffDate },
                    label: 'non-violent',
                    admin_user: (_j = req.user) === null || _j === void 0 ? void 0 : _j.username,
                    keyword: req.body.monitoringUser
                })
                    .exec();
                let tempViolents = violents;
                violents = (violents / (violents + nonViolents)) * 100;
                nonViolents = (nonViolents / (tempViolents + nonViolents)) * 100;
                return res.status(200).json({ violent: violents, nViolent: nonViolents });
            }
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ data: {} });
        }
    }),
    addUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _k;
        try {
            const newDoc = new user_keyword_1.default({
                admin_user: (_k = req.user) === null || _k === void 0 ? void 0 : _k.username,
                username: req.body.userToAdd,
                keyword: "",
                is_keyword: false
            });
            yield newDoc.save();
            res.status(200).json({ data: newDoc });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ data: {} });
        }
    }),
    deleteUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _l;
        try {
            const data = yield user_keyword_1.default.deleteOne({ username: req.body.userToDel, admin_user: (_l = req.user) === null || _l === void 0 ? void 0 : _l.username });
            res.status(200).json({ data: data });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ data: null });
        }
    }),
    addKeyword: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _m;
        try {
            const newDoc = new user_keyword_1.default({
                admin_user: (_m = req.user) === null || _m === void 0 ? void 0 : _m.username,
                username: "",
                keyword: req.body.keywordToAdd,
                is_keyword: true
            });
            yield newDoc.save();
            res.status(200).json({ data: newDoc });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ data: {} });
        }
    }),
    deleteKeyword: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _o;
        try {
            const data = yield user_keyword_1.default.deleteOne({ keyword: req.body.keywordToDel, admin_user: (_o = req.user) === null || _o === void 0 ? void 0 : _o.username });
            res.status(200).json({ data: data });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ data: null });
        }
    }),
    right4al: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield tweets_1.default.findById(new mongoose_1.default.Types.ObjectId(req.body.id)).select('-_id');
            const data = {
                admin_user: result === null || result === void 0 ? void 0 : result.admin_user,
                username: result === null || result === void 0 ? void 0 : result.username,
                keyword: result === null || result === void 0 ? void 0 : result.keyword,
                profile: result === null || result === void 0 ? void 0 : result.profile,
                tweet: result === null || result === void 0 ? void 0 : result.tweet,
                tweet_link: result === null || result === void 0 ? void 0 : result.tweet_link,
                is_keyword: result === null || result === void 0 ? void 0 : result.is_keyword,
                utcTime: result === null || result === void 0 ? void 0 : result.utcTime,
                id: req.body.id,
                label: result === null || result === void 0 ? void 0 : result.label
            };
            yield alTweet_1.default.findOneAndUpdate({ id: req.body.id }, data, {
                upsert: true,
                new: true,
            });
            res.status(200).json({ data: data });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ data: {} });
        }
    }),
    reverse4al: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield tweets_1.default.findById(new mongoose_1.default.Types.ObjectId(req.body.id)).select('-_id');
            let labelValue = "";
            if (result) {
                labelValue = result.label === "violent" ? "non-violent" : "violent";
                console.log(labelValue);
            }
            const data = {
                admin_user: result === null || result === void 0 ? void 0 : result.admin_user,
                username: result === null || result === void 0 ? void 0 : result.username,
                keyword: result === null || result === void 0 ? void 0 : result.keyword,
                profile: result === null || result === void 0 ? void 0 : result.profile,
                tweet: result === null || result === void 0 ? void 0 : result.tweet,
                tweet_link: result === null || result === void 0 ? void 0 : result.tweet_link,
                is_keyword: result === null || result === void 0 ? void 0 : result.is_keyword,
                utcTime: result === null || result === void 0 ? void 0 : result.utcTime,
                id: req.body.id,
                label: labelValue
            };
            yield alTweet_1.default.findOneAndUpdate({ id: req.body.id }, data, {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true,
            });
            res.status(200).json({ data: data });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ data: {} });
        }
    }),
    getDateFilteredTweets: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _p;
        console.log(req.body);
        try {
            const pageLimit = 5;
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
            const data = yield tweets_1.default
                .find({ label: { $ne: null }, admin_user: (_p = req.user) === null || _p === void 0 ? void 0 : _p.username, username: req.body.monitoringUser
                // utcTime:{
                //     $gte:new Date(req.body.startDate),
                //     $lte:new Date(req.body.endDate)
                //         }
             })
                .sort({ utcTime: -1 })
                .skip((req.body.page - 1) * pageLimit)
                .limit(pageLimit).
                exec();
            if (data.length > 0) {
                const newdata = [];
                data.forEach((element) => {
                    let obj = {
                        label: "",
                        tweet: "",
                        profile_pic: "",
                        tweet_id: ""
                    };
                    obj.label = element.label;
                    obj.tweet = element.tweet;
                    obj.profile_pic = element.profile;
                    obj.tweet_id = element._id;
                    newdata.push(obj);
                });
                return res.status(200).json({ data: newdata });
            }
            return res.status(500).json({ data: "" });
            // }
            // return res.status(200).json({data:""});
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ data: "" });
        }
    }),
    violentFilterTweets: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _q, _r;
        try {
            const pageLimit = 5;
            // if(req.user!==null && req.user!==undefined){
            // const data=await Tweet
            //             .find({label:{$ne:null},admin_user:(req.user as IUser).username})
            //             .sort({utcTime:-1})
            //             .skip((req.body.page-1)*pageLimit)
            //             .limit(pageLimit).
            //             exec();
            if (req.body.isUserMonitor) {
                const data = yield tweets_1.default
                    .find({ label: 'violent', admin_user: (_q = req.user) === null || _q === void 0 ? void 0 : _q.username, username: req.body.monitoringUser })
                    .sort({ utcTime: -1 })
                    .skip((req.body.page - 1) * pageLimit)
                    .limit(pageLimit).
                    exec();
                if (data.length > 0) {
                    const newdata = [];
                    data.forEach((element) => {
                        let obj = {
                            label: "",
                            tweet: "",
                            profile_pic: "",
                            tweet_id: ""
                        };
                        obj.label = element.label;
                        obj.tweet = element.tweet;
                        obj.profile_pic = element.profile;
                        obj.tweet_id = element._id;
                        newdata.push(obj);
                    });
                    return res.status(200).json({ data: newdata });
                }
                return res.status(200).json({ data: null });
            }
            else {
                const data = yield tweets_1.default
                    .find({ label: 'violent', admin_user: (_r = req.user) === null || _r === void 0 ? void 0 : _r.username, keyword: 'riot' })
                    .sort({ utcTime: -1 })
                    .skip((req.body.page - 1) * pageLimit)
                    .limit(pageLimit).
                    exec();
                if (data.length > 0) {
                    const newdata = [];
                    data.forEach((element) => {
                        let obj = {
                            label: "",
                            tweet: "",
                            profile_pic: "",
                            tweet_id: ""
                        };
                        obj.label = element.label;
                        obj.tweet = element.tweet;
                        obj.profile_pic = element.profile;
                        obj.tweet_id = element._id;
                        newdata.push(obj);
                    });
                    return res.status(200).json({ data: newdata });
                }
                return res.status(200).json({ data: null });
            }
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ data: "" });
        }
    }),
    getMyMonitoringUsers: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _s;
        try {
            const data = yield user_keyword_1.default.distinct('username', { admin_user: (_s = req.user) === null || _s === void 0 ? void 0 : _s.username, is_keyword: false });
            // console.log(data)
            const newdata = [];
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    let obj = {
                        person: "",
                        profile: ""
                    };
                    const doc = yield tweets_1.default.findOne({ username: data[i] });
                    if (doc) {
                        obj.person = data[i];
                        obj.profile = doc.profile;
                        newdata.push(obj);
                    }
                    else {
                        obj.person = data[i];
                        obj.profile = "";
                        newdata.push(obj);
                    }
                }
                ;
                return res.status(200).json({ data: newdata });
            }
            return res.status(200).json({ data: [] });
            // }
            // return res.status(200).json({data:""});
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ data: null });
        }
    }),
};
exports.default = dataController;
