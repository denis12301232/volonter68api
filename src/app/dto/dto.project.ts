import type { FlattenMaps, Types } from 'mongoose';
import type { IProject } from '@/types';

export default class ProjectDto {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly createdAt: string;
  readonly updatedAt: string;

  constructor(model: FlattenMaps<IProject> & { _id: Types.ObjectId }) {
    this.id = String(model._id);
    this.title = model.title;
    this.content = model.content;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
}
