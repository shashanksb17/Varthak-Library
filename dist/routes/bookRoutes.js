"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const bookController_1 = __importDefault(require("../controllers/bookController"));
const router = express_1.default.Router();
// Create book route (secured by CREATOR role)
router.post('/', (0, authMiddleware_1.default)('CREATOR'), bookController_1.default.createBook);
// Get books route (secured by VIEWER and VIEW_ALL roles)
router.get('/', (0, authMiddleware_1.default)('VIEWER'), bookController_1.default.getBooks);
exports.default = router;
