import type { UserRole } from '@/enums';
import { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { Mongo } from '@/common/mongo/models';

export default new Elysia({ name: 'plugin.auth' })
  .use(jwt({ secret: Bun.env.JWT_SECRET_ACCESS, name: 'access', exp: '5m' }))
  .resolve({ as: 'scoped' }, async ({ access, cookie, headers }) => {
    const token = cookie.access.value || headers.authorization?.split(' ').at(1);
    const verified = await access.verify(token);

    return { Auth: { user: { id: verified ? String(verified.id) : null }, verified } };
  })
  .macro(({ onBeforeHandle }) => ({
    isAuth(value: boolean) {
      onBeforeHandle(async ({ Auth, error }) => {
        if (!Auth?.verified) {
          throw error(401);
        }
      });
    },
    role(role: UserRole) {
      onBeforeHandle(async ({ Auth, error }) => {
        if (!Auth?.verified) {
          throw error(401);
        }

        const user = await Mongo.User.findById(Auth.verified.id);

        if (!user || !user.roles.includes(role)) {
          throw error(403);
        }
      });
    },
  }));
