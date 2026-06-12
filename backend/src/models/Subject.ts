import mongoose, { Schema, Document } from 'mongoose';

export interface ISubject extends Document {
  name: string;
  code: string;
  branch: string;
  semester: number;
  description: string;
  createdAt: Date;
}

const subjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  branch: { type: String, required: true },
  semester: { type: Number, required: true },
  description: { type: String },
}, { timestamps: true });

export default mongoose.model<ISubject>('Subject', subjectSchema);
