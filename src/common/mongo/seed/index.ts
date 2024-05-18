import { connect, disconnect } from 'mongoose';

export default class Seeder {
  private readonly seeders: Array<() => Promise<unknown>>;

  constructor(seeders: Array<() => Promise<unknown>>) {
    this.seeders = seeders;
  }

  seed() {
    return connect(Bun.env.MONGO_URL, { dbName: Bun.env.MONGO_DB_NAME })
      .then(() => Promise.all(this.seeders.map((f) => f())))
      .finally(disconnect);
  }
}
