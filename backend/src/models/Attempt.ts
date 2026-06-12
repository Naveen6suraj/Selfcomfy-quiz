import mongoose, { Schema, Document } from 'mongoose';

export interface IAttempt extends Document {
  user: mongoose.Types.ObjectId;
  quiz: mongoose.Types.ObjectId;
  score: number;
  totalPoints: number;
  answers: { question: mongoose.Types.ObjectId; selectedOptionIndex: number }[];
  completedAt: Date;
}

const attemptSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  quiz: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: { type: Number, required: true },
  totalPoints: { type: Number, required: true },
  answers: [{
    question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    selectedOptionIndex: { type: Number, required: true },
  }],
  completedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model<IAttempt>('Attempt', attemptSchema);
