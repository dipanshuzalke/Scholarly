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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //zod validation, hash the password
    const username = req.body.username;
    const password = req.body.password;
    try {
        yield db_1.UserModel.create({
            username,
            password
        });
        res.json({
            message: 'User created successfully'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = yield db_1.UserModel.findOne({
        username,
        password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, config_1.JWT_PASSWORD);
        res.json({
            token,
            message: 'User signed in successfully'
        });
    }
    else {
        res.status(401).json({
            message: 'Invalid credentials'
        });
    }
}));
app.post('/api/v1/content', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const link = req.body.link;
    const tags = req.body.tags;
    try {
        yield db_1.ContentModel.create({
            title,
            link,
            tags,
            // @ts-ignore
            userId: req.userId
        });
        res.json({
            message: 'Content created successfully'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));
app.get('/api/v1/content', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({
        userId
    }).populate("userId", "username");
    res.json({
        content
    });
}));
app.delete('/api/v1/content', middleware_1.userMiddleware, (req, res) => {
    const contentId = req.body.contentId;
    // @ts-ignore
    const userId = req.userId;
    db_1.ContentModel.deleteOne({
        _id: contentId,
        userId
    }).then(() => {
        res.json({
            message: 'Content deleted successfully'
        });
    }).catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    });
});
app.post('/api/v1/brain/share', (req, res) => { });
app.get('/api/v1/brain/:shareLink', (req, res) => { });
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
