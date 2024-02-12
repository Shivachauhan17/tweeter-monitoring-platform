"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./config/passport"));
const main_1 = __importDefault(require("./Routes/main"));
const data_1 = __importDefault(require("./Routes/data"));
dotenv_1.default.config();
(0, database_1.default)();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use((0, compression_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: 'keyboard cat',
    resave: false, //don't save session is unmodified
    saveUninitialized: true, //don't create session untill something is stores
    store: connect_mongo_1.default.create({
        mongoUrl: "mongodb+srv://Shivag:shivashiva@cluster0.mz5u2w1.mongodb.net/tweeter?retryWrites=true&w=majority",
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));
(0, passport_2.default)(passport_1.default);
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/', main_1.default);
app.use('/', data_1.default);
app.listen(8000, () => {
    console.log("server is running you better catch it");
});