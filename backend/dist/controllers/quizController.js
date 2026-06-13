"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuiz = exports.getQuizById = exports.getQuizzes = void 0;
const Quiz_1 = __importDefault(require("../models/Quiz"));
const Question_1 = __importDefault(require("../models/Question"));
const Subject_1 = __importDefault(require("../models/Subject"));
// @desc    Get all quizzes (optionally filter by subject)
// @route   GET /api/quizzes
// @access  Private
const getQuizzes = async (req, res) => {
    try {
        const subjectId = req.query.subjectId;
        const filter = subjectId ? { subject: subjectId } : {};
        const quizzes = await Quiz_1.default.find(filter)
            .populate('subject', 'name code')
            .sort({ createdAt: -1 });
        res.json(quizzes);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
exports.getQuizzes = getQuizzes;
// @desc    Get single quiz by ID with questions
// @route   GET /api/quizzes/:id
// @access  Private
const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz_1.default.findById(req.params.id)
            .populate('subject', 'name code')
            .populate('questions');
        if (quiz) {
            res.json(quiz);
        }
        else {
            res.status(404).json({ message: 'Quiz not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
exports.getQuizById = getQuizById;
// @desc    Create a new quiz
// @route   POST /api/quizzes
// @access  Private/Admin
const createQuiz = async (req, res) => {
    try {
        const { title, description, subject, durationMinutes, questions } = req.body;
        // Validate subject exists
        const subjectExists = await Subject_1.default.findById(subject);
        if (!subjectExists) {
            return res.status(400).json({ message: 'Subject not found' });
        }
        // Process questions first
        const createdQuestions = await Question_1.default.insertMany(questions.map((q) => ({
            ...q,
            subject: subject
        })));
        const questionIds = createdQuestions.map(q => q._id);
        // Create quiz with question IDs
        const quiz = await Quiz_1.default.create({
            title,
            description,
            subject,
            durationMinutes,
            questions: questionIds,
            createdBy: req.user._id
        });
        res.status(201).json(quiz);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
exports.createQuiz = createQuiz;
