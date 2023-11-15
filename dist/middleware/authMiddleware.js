"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (role) => {
    return (req, res, next) => {
        const token = req.header('Authorization');
        if (!token)
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        const secretKey = process.env.SECRET_KEY;
        if (!secretKey) {
            return res.status(500).json({ message: 'Internal Server Error. JWT secret key is not defined.' });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, secretKey);
            // console.log('Decoded Token:', decoded);
            const userRoles = decoded.roles || [];
            if (!userRoles.includes(role)) {
                return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
            }
            req.user = decoded;
            next();
        }
        catch (ex) {
            res.status(400).json({ message: 'Invalid token.' });
        }
    };
};
exports.default = authMiddleware;
