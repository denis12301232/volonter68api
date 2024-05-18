import App from '@/server';
import { cors } from '@elysiajs/cors';
import { logger } from '@bogeychan/elysia-logger';
import { start, stop, mongo, root, exeption } from '@/plugins';
import { auth, user, news, project } from '@/app/controllers';
import { Cookies, Cors } from '@/utils';

export const app = new App({ cookie: { sign: Cookies.SIGN, secrets: Bun.env.COOKIE_SECRET } })
  .onStart(start)
  .onStop(stop)
  .use(logger())
  .use(cors({ origin: true, allowedHeaders: Cors.ALLOWED_HEADERS, methods: Cors.METHODS }))
  .use(auth)
  .use(user)
  .use(news)
  .use(project)
  .use(exeption)
  .use(mongo(Bun.env.MONGO_URL, { dbName: Bun.env.MONGO_DB_NAME }))
  .use(root)
  .listen(Bun.env.PORT);
