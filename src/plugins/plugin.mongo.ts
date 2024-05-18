import { Mongo } from '@/common/mongo/models';
import { Elysia } from 'elysia';
import { connect, type ConnectOptions } from 'mongoose';

export default async function mongo(url: string, options?: ConnectOptions) {
  return async function (app: Elysia) {
    await connect(url, options)
      .then(() => console.log(`Mongo is connecting at ${url}`))
      .catch((e) => {
        console.log(e);
        app.stop();
      });

    return app.decorate('Mongo', Mongo);
  };
}
