"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubject = exports.getSubjects = void 0;
const Subject_1 = __importDefault(require("../models/Subject"));
const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject_1.default.find().sort({ semester: 1, name: 1 });
        res.json(subjects);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
exports.getSubjects = getSubjects;
const createSubject = async (req, res) => {
    try {
        const { name, code, branch, semester, description } = req.body;
        const subjectExists = await Subject_1.default.findOne({ code });
        if (subjectExists) {
            return res.status(400).json({ message: 'Subject with this code already exists' });
        }
        const subject = await Subject_1.default.create({
            name, code, branch, semester, description
        });
        res.status(201).json(subject);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
exports.createSubject = createSubject;
