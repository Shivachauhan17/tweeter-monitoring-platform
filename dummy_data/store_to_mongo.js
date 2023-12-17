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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var dotenv = require("dotenv");
dotenv.config();
function insertDocuments(docs) {
    return __awaiter(this, void 0, void 0, function () {
        var dbName, url, client, db, collection, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dbName = "tweeter";
                    url = process.env.DB_STRING;
                    client = new mongodb_1.MongoClient(url);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 4, 6]);
                    // Connect to the MongoDB server
                    return [4 /*yield*/, client.connect()];
                case 2:
                    // Connect to the MongoDB server
                    _a.sent();
                    db = client.db(dbName);
                    collection = db.collection('tweets');
                    return [4 /*yield*/, collection.insertMany(docs)];
                case 3:
                    result = _a.sent();
                    console.log("".concat(result.insertedCount, " documents inserted."));
                    return [3 /*break*/, 6];
                case 4: 
                // Close the connection when done
                return [4 /*yield*/, client.close()];
                case 5:
                    // Close the connection when done
                    _a.sent();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// Example usage
var documentsToInsert = [{
        "admin_user": "shiva",
        "username": "jerry",
        "profile": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fs3images.zee5.com%2Fwp-content%2Fuploads%2Fsites%2F7%2F2021%2F12%2FUntitled-design-2021-12-19T203847.073.jpg&tbnid=ffdR5jFCJdk5iM&vet=12ahUKEwjQmKPN0pSDAxXba2wGHcJKB50QMygSegUIARCQAQ..i&imgrefurl=https%3A%2F%2Fwww.zee5.com%2Fzee5news%2Furvashi-rautela-surpasses-these-popular-hollywood-celebrities-on-instagram-crosses-44-million-mark%2F&docid=TJRTOSWva3RQdM&w=1920&h=1080&q=hollywood%20celebrities&client=ubuntu-chr&ved=2ahUKEwjQmKPN0pSDAxXba2wGHcJKB50QMygSegUIARCQAQ",
        "tweet": "I would like to say a big thank you to everyone who has supported me and my small business this year. I hope you have a wonderful Christmas and a happy and healthy new year.",
        "label": "non-violent",
        "tweet_link": "https://twitter.com/poppyscupcakes/status/1735911195813478895",
        "monitor_type": "user"
    },
    {
        "admin_user": "shiva",
        "username": "jack",
        "profile": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.zeebiz.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fzeebiz_850x478%2Fpublic%2F2020%2F07%2F06%2F123535-screenshot-2020-07-06-at-160916.png%3Fitok%3DSZHs8pZm&tbnid=vbgmr8lbjv_dsM&vet=12ahUKEwjQmKPN0pSDAxXba2wGHcJKB50QMyg-egUIARDyAQ..i&imgrefurl=https%3A%2F%2Fwww.zeebiz.com%2Fworld%2Fnews-not-ronaldo-or-kylie-jenner-this-hollywood-actor-is-the-most-paid-celebrity-on-instagram-130600&docid=rWOTE6Ggf-HhMM&w=850&h=477&q=hollywood%20celebrities&client=ubuntu-chr&ved=2ahUKEwjQmKPN0pSDAxXba2wGHcJKB50QMyg-egUIARDyAQ",
        "tweet": "A circulating clip of riots breaking out within an Israeli military base depicts Israeli soldiers participating in a vandalizing frenzy. ",
        "label": "violent",
        "tweet_link": "https://twitter.com/search?q=riot&src=typed_query",
        "monitor_type": "keyword"
    }
];
insertDocuments(documentsToInsert).catch(console.error);
