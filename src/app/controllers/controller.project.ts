import { Elysia } from 'elysia';
import { auth } from '@/plugins';
import { ProjectSchema } from '@/app/schemas';
import { ProjectService } from '@/app/services';
import { UserRole } from '@/enums';

export default new Elysia({ prefix: '/api/v1/projects' })
  .use(ProjectSchema)
  .use(auth)
  .guard({ isAuth: true, role: UserRole.Admin }, (app) =>
    app
      .post(
        '/',
        async ({ body }) => {
          const result = await ProjectService.create(body);
          return result;
        },
        { body: 'project.create.body' }
      )
      .patch(
        '/:id',
        async ({ params, body }) => {
          const result = await ProjectService.update(params.id, body);
          return result;
        },
        { body: 'project.update.body', params: 'project.update.params' }
      )
      .delete(
        '/:id',
        async ({ params }) => {
          const result = await ProjectService.destroy(params.id);
          return result;
        },
        { params: 'project.destroy.params' }
      )
  )
  .get(
    '/',
    async ({ query }) => {
      const result = await ProjectService.index(query.page, query.limit);
      return result;
    },
    { query: 'project.index.query' }
  )
  .get(
    '/:id',
    async ({ params }) => {
      const result = await ProjectService.show(params.id);
      return result;
    },
    { params: 'project.show.params' }
  );
