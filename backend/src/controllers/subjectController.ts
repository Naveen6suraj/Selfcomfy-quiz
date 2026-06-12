import { Request, Response } from 'express';
import Subject from '../models/Subject';

export const getSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await Subject.find().sort({ semester: 1, name: 1 });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createSubject = async (req: Request, res: Response) => {
  try {
    const { name, code, branch, semester, description } = req.body;
    const subjectExists = await Subject.findOne({ code });
    
    if (subjectExists) {
      return res.status(400).json({ message: 'Subject with this code already exists' });
    }

    const subject = await Subject.create({
      name, code, branch, semester, description
    });

    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
