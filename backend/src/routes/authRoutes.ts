import express from 'express';
import { registerUser, loginUser, getUserProfile, updateProgress, getPublicProfile } from '../controllers/authController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/progress', protect, updateProgress);
router.get('/public/:id', getPublicProfile);

export default router;
