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
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, roles } = req.body;
            try {
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const newUser = yield userModel_1.default.create({ username, password: hashedPassword, roles });
                res.status(201).json({ message: 'User registered successfully', user: newUser });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                const user = yield userModel_1.default.findOne({ username });
                if (!user) {
                    return res.status(401).json({ message: 'Invalid username or password' });
                }
                const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ message: 'Invalid username or password' });
                }
                const secretKey = process.env.SECRET_KEY;
                if (!secretKey) {
                    return res.status(500).json({ message: 'Internal Server Error. JWT secret key is not defined.' });
                }
                const token = jsonwebtoken_1.default.sign({ username, roles: user.roles }, secretKey, { expiresIn: '1h' });
                res.status(200).json({ message: 'Login successful', token });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
}
exports.default = new UserController();
