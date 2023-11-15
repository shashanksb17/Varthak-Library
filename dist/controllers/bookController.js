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
const bookModel_1 = __importDefault(require("../models/bookModel"));
class BookController {
    createBook(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { title } = req.body;
            const creator = (_a = req.user) === null || _a === void 0 ? void 0 : _a.username;
            try {
                const newBook = yield bookModel_1.default.create({ title, creator });
                res.status(201).json(newBook);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    getBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { old, new: isNew } = req.query;
            const filter = isNew ? { createdAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) } } : {};
            try {
                const books = yield bookModel_1.default.find(filter);
                res.status(200).json(books);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
}
exports.default = new BookController();
