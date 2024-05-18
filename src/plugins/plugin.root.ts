import { Elysia } from 'elysia';
import { root } from '@/common/mongo/seed/seeders';

export default async function (app: Elysia) {
  return root().then(() => app);
}
