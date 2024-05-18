import type { INews } from '@/types';
import { Schema, model } from 'mongoose';

const schema = new Schema<INews>(
  {
    title: String,
    content: String,
    reporter: String,
    date: Date,
    hidden: { type: Boolean, default: false },
    pinned: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

export default model<INews>('news', schema);
