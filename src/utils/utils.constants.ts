import type { CookieOptions } from 'elysia';
import type { HTTPMethod } from '@elysiajs/cors';

export namespace Cookies {
  export const SIGN = ['access', 'refresh'];
  export const JWT: Record<'refresh' | 'access', CookieOptions> = {
    refresh: {
      maxAge: 2592e3, // 30 days
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      path: '/',
    },
    access: {
      maxAge: 300, // 5 min
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      path: '/',
    },
  };
}

export namespace Cors {
  export const ALLOWED_HEADERS = ['Content-Type'];
  export const METHODS: HTTPMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
}
