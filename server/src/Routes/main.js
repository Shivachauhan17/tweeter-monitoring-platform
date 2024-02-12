"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_1 = __importDefault(require("../controllers/main"));
const defaultRoute = (0, express_1.Router)();
defaultRoute.all('/successLogin', main_1.default.successRedirect);
defaultRoute.all('/failureLogin', main_1.default.failureRedirect);
defaultRoute.post('/login', main_1.default.login);
defaultRoute.get('/', main_1.default.home);
defaultRoute.post("/signup", main_1.default.postSignup);
exports.default = defaultRoute;
