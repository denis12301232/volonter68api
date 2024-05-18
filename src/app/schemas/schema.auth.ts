import { Elysia, t } from 'elysia';

export default new Elysia().model({
  'auth.login.body': t.Object({
    login: t.String(),
    password: t.String(),
  }),
  'auth.registration.body': t.Object({
    login: t.String({ minLength: 4, maxLength: 20 }),
    password: t.String({ minLength: 8, maxLength: 32 }),
  }),
  'auth.cookie': t.Cookie({
    refresh: t.String(),
    access: t.String(),
  }),
});
