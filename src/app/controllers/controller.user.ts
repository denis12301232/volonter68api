import { Elysia } from 'elysia';
import { auth } from '@/plugins';
import { UserService } from '@/app/services';
import { UserSchema } from '@/app/schemas';
import { UserRole } from '@/enums';

export default new Elysia({ prefix: '/api/v1/users' })
  .use(UserSchema)
  .use(auth)
  .guard({ isAuth: true }, (app) =>
    app
      .get('/me', async ({ Auth }) => {
        const result = await UserService.me(Auth.user.id);
        return result;
      })
      .patch(
        '/password',
        async ({ Auth, body }) => {
          const result = await UserService.password(Auth.user.id, body);
          return result;
        },
        { body: 'user.password.body' }
      )
  )
  .guard({ isAuth: true, role: UserRole.Admin }, (app) =>
    app.patch(
      '/role',
      async ({ body, params }) => {
        const result = await UserService.role(params.id, body.role);
        return result;
      },
      { body: 'user.role.body', params: 'user.role.params' }
    )
  );
