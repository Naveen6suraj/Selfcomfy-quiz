import mongoose, { Schema, Document } from 'mongoose';

export interface IQuiz extends Document {
  title: string;
  subject: mongoose.Types.ObjectId;
  description: string;
  durationMinutes: number;
  isActive: boolean;
  questions: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const quizSchema: Schema = new Schema({
  title: { type: String, required: true },
  subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
  description: { type: String },
  durationMinutes: { type: Number, required: true, default: 30 },
  isActive: { type: Boolean, default: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model<IQuiz>('Quiz', quizSchema);
