import type { FlattenMaps, Types } from 'mongoose';
import type { INews } from '@/types';

export default class NewsDto {
  readonly id: string;
  readonly title: string;
  readonly reporter: string;
  readonly content: string;
  readonly date: Date;
  readonly pinned: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;

  constructor(model: FlattenMaps<INews> & { _id: Types.ObjectId }) {
    this.id = String(model._id);
    this.title = model.title;
    this.reporter = model.reporter;
    this.content = model.content;
    this.date = model.date;
    this.pinned = model.pinned;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
}
