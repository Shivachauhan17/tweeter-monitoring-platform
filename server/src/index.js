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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const main_1 = __importDefault(require("./Routes/main"));
const data_1 = __importDefault(require("./Routes/data"));
dotenv_1.default.config();
(0, database_1.default)();
const app = (0, express_1.default)();
// app.use(express.static(path.join(__dirname, 'dist')));
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({
    origin: ['https://tweeter-monitoring-platform.vercel.app', "http://localhost:5173"],
    credentials: true
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.set("trust proxy", 1);
app.use((0, cookie_parser_1.default)());
app.use('/', main_1.default);
app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.cookies);
        const token = req.cookies.access_token;
        console.log("token:", token);
        if (!token) {
            return res.status(401).json({ error: 'No token provided.' });
        }
        let tokendata = null;
        try {
            tokendata = (yield jsonwebtoken_1.default.verify(token, "Secret"));
        }
        catch (e) {
            console.log(e);
            return res.status(400).json({ msg: 'Wrong credentials.' });
        }
        if (!tokendata) {
            return res.status(400).json({ msg: 'Wrong credentials.' });
        }
        req.user = tokendata; // Now req.user is properly typed
        console.log("req.user:", req.user);
        next();
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ msg: 'Server side errors' });
    }
}));
app.use('/', data_1.default);
app.listen(8000, () => {
    console.log("server is running you better catch it");
});
