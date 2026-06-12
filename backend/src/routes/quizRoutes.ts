import express from 'express';
import { getQuizzes, getQuizById, createQuiz } from '../controllers/quizController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(protect, getQuizzes)
  .post(protect, admin, createQuiz);

router.route('/:id')
  .get(protect, getQuizById);

export default router;
