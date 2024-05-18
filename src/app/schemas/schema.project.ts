import { Elysia, t } from 'elysia';
import { SortProjects } from '@/enums';

export default new Elysia().model({
  'project.index.query': t.Object({
    page: t.Numeric({ minimum: 1 }),
    limit: t.Numeric({ minimum: 1, maximum: 100 }),
    sort: t.Enum(SortProjects, { default: '_id' }),
  }),
  'project.show.params': t.Object({
    id: t.String(),
  }),
  'project.create.body': t.Object({
    title: t.String(),
    content: t.String(),
  }),
  'project.update.body': t.Object({
    title: t.Optional(t.String()),
    content: t.Optional(t.String()),
  }),
  'project.update.params': t.Object({
    id: t.String(),
  }),
  'project.destroy.params': t.Object({
    id: t.String(),
  }),
  'project.restore.params': t.Object({
    id: t.String(),
  }),
});
