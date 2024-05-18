import { Elysia } from 'elysia';
import { MongooseError } from 'mongoose';

export default new Elysia().error({ MongooseError }).onError(({ code, error }) => {
  switch (code) {
    case 'MongooseError':
      return error;
    default:
      return error;
  }
});
