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
const user_1 = __importDefault(require("../models/user"));
// import { json } from 'body-parser';
const passwordUtils_1 = require("../lib/passwordUtils");
const passport_1 = __importDefault(require("passport"));
const mainRoute = {
    home: (req, res, next) => {
        try {
            if (req.user !== null && req.user !== undefined) {
                return res.status(200).json({ user: req.user.username });
            }
            return res.status(200).json({ user: "" });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ user: "" });
        }
    },
    postSignup: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const validationErrors = [];
            if (req.body.password.length < 8) {
                validationErrors.push("password must be atleast 8 characters long");
            }
            if (req.body.password !== req.body.confirm_password) {
                validationErrors.push("passwords do not match");
            }
            if (validationErrors.length) {
                return res.json({ error: validationErrors, user: null });
            }
            const existingUser = yield user_1.default.findOne({ username: req.body.username });
            if (existingUser) {
                return res.json({ error: ["user already exists"], user: null });
            }
            const saltHash = (0, passwordUtils_1.genPassword)(req.body.password);
            const salt = saltHash.salt;
            const hash = saltHash.hash;
            const newUser = new user_1.default({
                email: "",
                username: req.body.username,
                password: hash,
                salt: salt,
            });
            yield newUser.save();
            return res.json({ error: null, user: req.body.username });
        }
        catch (err) {
            console.log("error in postSignup:", err);
            return res.json({ error: "some unexpacted error", user: null });
        }
    }),
    login: passport_1.default.authenticate('local', { successRedirect: "/successLogin", failureRedirect: "/failureLogin" }),
    successRedirect: (req, res, next) => {
        console.log(req.user);
        if (req.user !== null && req.user !== undefined) {
            console.log("okk");
            return res.status(200).json({ user: req.user.username });
        }
        res.status(200).json({ user: null });
    },
    failureRedirect: (req, res, next) => {
        res.status(500).json({ user: null });
    }
};
exports.default = mainRoute;
