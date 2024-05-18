import type { FlattenMaps, Types } from 'mongoose';
import type { IUser } from '@/types';

export default class UserDto {
  readonly id: string;
  readonly login: string;
  readonly roles: string[];
  readonly createdAt: string;
  readonly updatedAt: string;

  constructor(model: FlattenMaps<IUser> & { _id: Types.ObjectId }) {
    this.id = String(model._id);
    this.login = model.login;
    this.roles = model.roles;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
}
