import express from 'express';
import { getSubjects, createSubject } from '../controllers/subjectController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(protect, getSubjects)
  .post(protect, admin, createSubject);

export default router;
