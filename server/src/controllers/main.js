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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
            if (!req.body.password || !req.body.username || !req.body.confirm_password) {
                return res.status(411).json({ msg: "wrong inputs" });
            }
            console.log(req.body.password, req.body.username, req.body.confirm_password);
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
                return res.status(403).json({ error: ["user already exists"], user: null });
            }
            const saltHash = (0, passwordUtils_1.genPassword)(req.body.password);
            console.log(saltHash);
            const salt = saltHash.salt;
            const hash = saltHash.hash;
            const newUser = new user_1.default({
                email: "",
                username: req.body.username,
                password: hash,
                salt: salt,
            });
            const savedUser = yield newUser.save();
            const userForToken = {
                username: savedUser.username,
                id: savedUser.id,
            };
            let token = null;
            token = jsonwebtoken_1.default.sign(userForToken, "Secret");
            if (!token) {
                return res.status(500).json({ msg: null, err: "Authorization Assignment failed." });
            }
            res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            }).status(200).send({ username: req.body.username });
        }
        catch (err) {
            console.log("error in postSignup:", err);
            return res.status(500).json({ error: "some unexpacted error", user: null });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            console.log(username, password);
            if (!username || !password) {
                return res.status(411).json({ msg: null, err: "Some fields are missing from the request." });
            }
            const user = yield user_1.default.findOne({ username: username });
            if (!user) {
                return res.status(401).json({ msg: "No such user exists." });
            }
            const passwordCorrect = (0, passwordUtils_1.validPassword)(password, user.password, user.salt);
            console.log("passwordCorrect:", passwordCorrect);
            if (!passwordCorrect) {
                return res.status(401).json({ error: 'Invalid username or password.' });
            }
            const userForToken = {
                username: user.username,
                id: user.id,
            };
            const token = jsonwebtoken_1.default.sign(userForToken, "Secret");
            if (!token) {
                return res.status(500).json({ msg: null, err: "Authorization assignment failed." });
            }
            return res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            }).status(200).send({ username: user.username });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ err: 'An error occurred during login.' });
        }
    })
};
exports.default = mainRoute;
