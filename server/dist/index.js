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
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
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
    const type = req.body.type;
    const description = req.body.description;
    try {
        yield db_1.ContentModel.create({
            title,
            link,
            type,
            description,
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
// app.get('/api/v1/content', userMiddleware, async (req, res) => {
//   // @ts-ignore
//   const userId = req.userId
//   const content = await ContentModel.find({
//     userId
//   }).populate('userId', 'username')
//   res.json({
//     content
//   })
// })
app.get('/api/v1/content', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type } = req.query;
        // Use a flexible object type to allow adding keys dynamically
        const query = {
            // @ts-ignore
            userId: req.userId
        };
        if (type) {
            query.type = type; // ✅ No TS error now
        }
        const content = yield db_1.ContentModel.find(query);
        res.json({ content });
    }
    catch (error) {
        console.error("❌ Error fetching content:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.delete('/api/v1/content', middleware_1.userMiddleware, (req, res) => {
    const contentId = req.body.contentId;
    // @ts-ignore
    const userId = req.userId;
    db_1.ContentModel.deleteOne({
        _id: contentId,
        userId
    })
        .then(() => {
        res.json({
            message: 'Content deleted successfully'
        });
    })
        .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    });
});
app.post('/api/v1/brain/share', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { share } = req.body;
    if (share) {
        // Check if a link already exists for the user.
        const existingLink = yield db_1.LinkModel.findOne({
            // @ts-ignore
            userId: req.userId
        });
        if (existingLink) {
            res.json({ hash: existingLink.hash }); // Send existing hash if found.
            return;
        }
        // Generate a new hash for the shareable link.
        const hash = (0, utils_1.random)(10);
        yield db_1.LinkModel.create({
            // @ts-ignore
            userId: req.userId,
            hash
        });
        res.json({ hash }); // Send new hash in the response.
    }
    else {
        // Remove the shareable link if share is false.
        yield db_1.LinkModel.deleteOne({
            // @ts-ignore
            userId: req.userId
        });
        res.json({ message: 'Removed link' }); // Send success response.
    }
}));
app.get('/api/v1/brain/:shareLink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({
        hash
    });
    if (link) {
        const content = yield db_1.ContentModel.find({
            userId: link.userId
        });
        const user = yield db_1.UserModel.findOne({
            _id: link.userId
        });
        res.json({
            username: user === null || user === void 0 ? void 0 : user.username,
            content
        });
    }
    else {
        res.status(404).json({
            message: 'Link not found'
        });
    }
}));
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
