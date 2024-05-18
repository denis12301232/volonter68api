import { Mongo } from '@/common/mongo/models';

export default abstract class SessionService {
  static async create(refresh: string, userId: string) {
    const result = await Mongo.Session.findOneAndUpdate({ userId }, { refresh }).lean();

    if (result) {
      return result;
    }

    return Mongo.Session.create({ userId, refresh });
  }

  static clear(refresh: string, userId: string) {
    return Mongo.Session.deleteOne({ refresh, userId }).lean();
  }

  static has(refresh: string) {
    return Mongo.Session.findOne({ refresh })
      .lean()
      .then((result) => (result ? true : false));
  }

  static async update(refresh: string, userId: string) {
    const result = await Mongo.Session.findOneAndUpdate({ userId }, { refresh }).lean();

    if (result) {
      return result;
    }

    return Mongo.Session.create({ userId, refresh });
  }
}
