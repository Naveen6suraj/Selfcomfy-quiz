import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
  quiz: mongoose.Types.ObjectId;
  text: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
  points: number;
}

const questionSchema: Schema = new Schema({
  quiz: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOptionIndex: { type: Number, required: true },
  explanation: { type: String },
  points: { type: Number, default: 1 },
}, { timestamps: true });

export default mongoose.model<IQuestion>('Question', questionSchema);
