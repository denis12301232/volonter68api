import { Elysia, t } from 'elysia';
import { UserRole } from '@/enums';

export default new Elysia().model({
  'user.password.body': t.Object({
    old: t.String(),
    new: t.String(),
  }),
  'user.role.params': t.Object({
    id: t.String(),
  }),
  'user.role.body': t.Object({
    role: t.Enum(UserRole),
  }),
});
