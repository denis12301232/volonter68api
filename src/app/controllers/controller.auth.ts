import { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { AuthSchema } from '@/app/schemas';
import { AuthService, SessionService } from '@/app/services';
import { Cookies } from '@/utils';

export default new Elysia({ prefix: '/api/v1/auth' })
  .use(jwt({ secret: Bun.env.JWT_SECRET_ACCESS, name: 'access', exp: '5m' }))
  .use(jwt({ secret: Bun.env.JWT_SECRET_REFRESH, name: 'refresh', exp: '30d' }))
  .use(AuthSchema)
  .guard({ cookie: 'auth.cookie' }, (app) =>
    app
      .post(
        '/registration',
        async ({ body, cookie, access, refresh }) => {
          const user = await AuthService.registration(body.login, body.password);
          const tokens = await Promise.all([
            access.sign({ ...(user as any) }),
            refresh.sign({ ...(user as any) }),
          ]).then(([access, refresh]) => ({ access, refresh }));
          await SessionService.create(tokens.refresh, user.id);

          cookie.access.set({ ...Cookies.JWT.access, value: tokens.access });
          cookie.refresh.set({ ...Cookies.JWT.refresh, value: tokens.refresh });

          return { user, ...tokens };
        },
        { body: 'auth.registration.body' }
      )
      .post(
        '/login',
        async ({ body, cookie, access, refresh }) => {
          const user = await AuthService.login(body.login, body.password);
          const tokens = await Promise.all([
            access.sign({ ...(user as any) }),
            refresh.sign({ ...(user as any) }),
          ]).then(([access, refresh]) => ({ access, refresh }));
          await SessionService.create(tokens.refresh, user.id);

          cookie.access.set({ ...Cookies.JWT.access, value: tokens.access });
          cookie.refresh.set({ ...Cookies.JWT.refresh, value: tokens.refresh });

          return { user, ...tokens };
        },
        { body: 'auth.login.body' }
      )
      .get('/refresh', async ({ cookie, access, refresh }) => {
        const [decoded, session] = await Promise.all([
          refresh.verify(cookie.refresh.value),
          SessionService.has(cookie.refresh.value),
        ]);

        const user = await AuthService.refresh(decoded, session);
        const tokens = await Promise.all([
          access.sign({ ...(user as any) }),
          refresh.sign({ ...(user as any) }),
        ]).then(([access, refresh]) => ({ access, refresh }));

        await SessionService.update(tokens.refresh, user.id);

        cookie.access.set({ ...Cookies.JWT.access, value: tokens.access });
        cookie.refresh.set({ ...Cookies.JWT.refresh, value: tokens.refresh });

        return { user, ...tokens };
      })
      .delete('/logout', async ({ cookie, access }) => {
        const decoded = await access.verify(cookie.access.value);
        const user = await AuthService.logout(decoded);

        cookie.refresh.remove();
        cookie.access.remove();

        return SessionService.clear(cookie.refresh.value, user.id);
      })
  );
