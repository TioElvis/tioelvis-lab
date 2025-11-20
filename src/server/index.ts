import { j } from "./jstack";

const api = j
  .router()
  .basePath("/api")
  .use(j.defaults.cors)
  .onError(j.defaults.errorHandler);

const app_router = j.mergeRouters(api, {});

export type AppRouter = typeof app_router;

export default app_router;
