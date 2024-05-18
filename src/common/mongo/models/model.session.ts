import type { ISession } from '@/types';
import { Schema, model } from 'mongoose';

const schema = new Schema<ISession>(
  {
    userId: { type: String, ref: 'user', unique: true },
    refresh: { type: String, unique: true },
  },
  { timestamps: true }
);

export default model<ISession>('session', schema);
