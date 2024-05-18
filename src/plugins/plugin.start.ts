import type { Elysia } from 'elysia';

export default function start(app: Elysia) {
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
}
