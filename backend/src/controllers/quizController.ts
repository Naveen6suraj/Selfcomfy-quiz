import { Request, Response } from 'express';
import Quiz from '../models/Quiz';
import Question from '../models/Question';
import Subject from '../models/Subject';

// @desc    Get all quizzes (optionally filter by subject)
// @route   GET /api/quizzes
// @access  Private
export const getQuizzes = async (req: Request, res: Response) => {
  try {
    const subjectId = req.query.subjectId as string;
    const filter: any = subjectId ? { subject: subjectId } : {};
    
    const quizzes = await Quiz.find(filter)
      .populate('subject', 'name code')
      .sort({ createdAt: -1 });
      
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single quiz by ID with questions
// @route   GET /api/quizzes/:id
// @access  Private
export const getQuizById = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('subject', 'name code')
      .populate('questions');
      
    if (quiz) {
      res.json(quiz);
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new quiz
// @route   POST /api/quizzes
// @access  Private/Admin
export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { title, description, subject, durationMinutes, questions } = req.body;
    
    // Validate subject exists
    const subjectExists = await Subject.findById(subject);
    if (!subjectExists) {
      return res.status(400).json({ message: 'Subject not found' });
    }

    // Process questions first
    const createdQuestions = await Question.insertMany(
      questions.map((q: any) => ({
        ...q,
        subject: subject
      }))
    );
    
    const questionIds = createdQuestions.map(q => q._id);

    // Create quiz with question IDs
    const quiz = await Quiz.create({
      title,
      description,
      subject,
      durationMinutes,
      questions: questionIds,
      createdBy: (req as any).user._id
    });

    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
