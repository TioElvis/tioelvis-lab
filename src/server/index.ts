import { j } from "./jstack";
import { project_router } from "./routers/project";

const api = j
  .router()
  .basePath("/api")
  .use(j.defaults.cors)
  .onError(j.defaults.errorHandler);

const app_router = j.mergeRouters(api, {
  project: project_router,
});

export type AppRouter = typeof app_router;

export default app_router;
