import type { INews } from '@/types';
import { Mongo } from '@/common/mongo/models';
import { NewsDto } from '@/app/dto';

export default abstract class NewsService {
  static async index(page: number, limit: number, sort: string) {
    const skip = (page - 1) * limit;
    const [news, total] = await Promise.all([
      Mongo.News.find({ hidden: false })
        .sort({ pinned: -1, [sort]: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Mongo.News.countDocuments({ hidden: false }),
    ]);

    return { news: news.map((item) => new NewsDto(item)), total };
  }

  static async show(id: string) {
    const result = await Mongo.News.findById(id).lean();
    return result ? { news: new NewsDto(result) } : null;
  }

  static async create(
    news: Partial<Omit<INews, 'hidden' | 'createdAt' | 'updatedAt' | 'deletedAt'>>
  ) {
    const result = await Mongo.News.create(news);
    return { news: new NewsDto(result) };
  }

  static async update(
    _id: string,
    news: Partial<Omit<INews, 'createdAt' | 'updatedAt' | 'deletedAt'>>
  ) {
    const result = await Mongo.News.updateOne({ _id }, news);
    return result;
  }

  static async destroy(_id: string) {
    const result = await Mongo.News.updateOne({ _id }, { deletedAt: new Date() }).lean();
    return result;
  }

  static async restore(_id: string) {
    const result = await Mongo.News.updateOne({ _id }, { $unset: { deletedAt: 1 } }).lean();
    return result;
  }
}
