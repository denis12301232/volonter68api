import { Elysia } from 'elysia';
import { NewsSchema } from '@/app/schemas';
import { NewsService } from '@/app/services';
import { auth } from '@/plugins';
import { UserRole } from '@/enums';

export default new Elysia({ prefix: '/api/v1/news' })
  .use(NewsSchema)
  .use(auth)
  .guard({ isAuth: true, role: UserRole.Admin }, (app) =>
    app
      .post(
        '/',
        async ({ body }) => {
          const result = await NewsService.create(body);
          return result;
        },
        { body: 'news.create.body' }
      )
      .patch(
        '/:id',
        async ({ body, params }) => {
          const result = await NewsService.update(params.id, body);
          return result;
        },
        { body: 'news.update.body', params: 'news.update.params' }
      )
      .delete(
        '/:id',
        async ({ params }) => {
          const result = await NewsService.destroy(params.id);
          return result;
        },
        { params: 'news.destroy.params' }
      )
      .patch(
        '/restore/:id',
        async ({ params }) => {
          const result = await NewsService.restore(params.id);
          return result;
        },
        { params: 'news.restore.params' }
      )
  )
  .get(
    '/',
    async ({ query }) => {
      const result = await NewsService.index(query.page, query.limit, query.sort);
      return result;
    },
    { query: 'news.index.query' }
  )
  .get(
    '/:id',
    async ({ params }) => {
      const result = await NewsService.show(params.id);
      return result;
    },
    { params: 'news.show.params' }
  );
