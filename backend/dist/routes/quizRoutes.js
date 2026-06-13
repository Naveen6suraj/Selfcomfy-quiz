"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quizController_1 = require("../controllers/quizController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route('/')
    .get(authMiddleware_1.protect, quizController_1.getQuizzes)
    .post(authMiddleware_1.protect, authMiddleware_1.admin, quizController_1.createQuiz);
router.route('/:id')
    .get(authMiddleware_1.protect, quizController_1.getQuizById);
exports.default = router;
