import { Request, Response } from 'express';
import User from '../models/User';
import { generateToken } from '../utils/generateToken';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role, branch, semester } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'student',
      branch,
      semester,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        branch: user.branch,
        xp: user.xp,
        streak: user.streak,
        quizzesTaken: user.quizzesTaken,
        accuracy: user.accuracy,
        badges: user.badges,
        token: generateToken(user.id, user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        branch: user.branch,
        xp: user.xp,
        streak: user.streak,
        quizzesTaken: user.quizzesTaken,
        accuracy: user.accuracy,
        badges: user.badges,
        token: generateToken(user.id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // req.user should be populated by authMiddleware
    const user = await User.findById((req as any).user._id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update user progress after a quiz
// @route   PUT /api/auth/progress
// @access  Private
export const updateProgress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { xpEarned, scorePercentage } = req.body;
    
    const user = await User.findById((req as any).user._id);
    
    if (user) {
      user.xp += xpEarned || 0;
      user.quizzesTaken += 1;
      
      // Basic moving average for accuracy
      if (user.quizzesTaken === 1) {
        user.accuracy = scorePercentage;
      } else {
        user.accuracy = Math.round(((user.accuracy * (user.quizzesTaken - 1)) + scorePercentage) / user.quizzesTaken);
      }
      
      // Simple streak logic: if they take a quiz, ensure streak is at least 1
      if (user.streak === 0) user.streak = 1;

      await user.save();
      
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        branch: user.branch,
        xp: user.xp,
        streak: user.streak,
        quizzesTaken: user.quizzesTaken,
        accuracy: user.accuracy,
        badges: user.badges,
        token: req.headers.authorization?.split(' ')[1] // return existing token
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get public profile for sharing
// @route   GET /api/auth/public/:id
// @access  Public
export const getPublicProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select('name role branch xp streak quizzesTaken accuracy badges');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
