import { UserRole } from '@/enums';
import type { IUser } from '@/types';
import { Schema, model } from 'mongoose';

const schema = new Schema<IUser>(
  {
    login: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    roles: { type: [String], default: ['user'] },
  },
  { timestamps: true }
);

export default model<IUser>('user', schema);
