declare namespace NodeJS {
  interface ProcessEnv {
    readonly PORT: number;
    readonly JWT_SECRET_ACCESS: string;
    readonly JWT_SECRET_REFRESH: string;
    readonly COOKIE_SECRET: string;
    readonly ROOT_PASSWORD: string;

    readonly MONGO_URL: string;
    readonly MONGO_DB_NAME: string;
  }
}
