import { Elysia, t } from 'elysia';
import { SortNews } from '@/enums';

export default new Elysia().model({
  'news.index.query': t.Object({
    page: t.Numeric({ minimum: 1 }),
    limit: t.Numeric({ minimum: 1, maximum: 100 }),
    sort: t.Enum(SortNews, { default: '_id' }),
  }),
  'news.show.params': t.Object({
    id: t.String(),
  }),
  'news.create.body': t.Object({
    title: t.String(),
    content: t.String(),
    reporter: t.String(),
    pinned: t.Optional(t.Boolean()),
    date: t.Date(),
  }),
  'news.update.body': t.Object({
    title: t.Optional(t.String()),
    content: t.Optional(t.String()),
    reporter: t.Optional(t.String()),
    pinned: t.Optional(t.Boolean()),
    hidden: t.Optional(t.Boolean()),
    date: t.Optional(t.Date()),
  }),
  'news.update.params': t.Object({
    id: t.String(),
  }),
  'news.destroy.params': t.Object({
    id: t.String(),
  }),
  'news.restore.params': t.Object({
    id: t.String(),
  }),
});
