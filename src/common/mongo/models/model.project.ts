import type { IProject } from '@/types';
import { Schema, model } from 'mongoose';

const schema = new Schema<IProject>(
  {
    title: String,
    content: String,
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

export default model<IProject>('project', schema);
