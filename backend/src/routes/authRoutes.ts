import express from 'express';
import { registerUser, loginUser, getUserProfile, updateProgress, getPublicProfile, forgotPassword, resetPassword } from '../controllers/authController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/progress', protect, updateProgress);
router.get('/public/:id', getPublicProfile);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;
