import { Scrypt } from '@/utils';
import { Mongo } from '@/common/mongo/models';

export default async function root() {
  const password = await Scrypt.hash(Bun.env.ROOT_PASSWORD);
  return Mongo.User.create({ login: 'root', password, roles: ['user', 'admin'] });
}
