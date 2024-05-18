FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --production

COPY src src
COPY tsconfig.json .
# COPY public public

RUN bun run build

ENV NODE_ENV production
CMD ["bun", "build/server.js"]

EXPOSE 5000