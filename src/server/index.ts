import { j } from "./jstack";
import { project_router } from "./routers/project";
import { section_router } from "./routers/section";

const api = j
  .router()
  .basePath("/api")
  .use(j.defaults.cors)
  .onError(j.defaults.errorHandler);

const app_router = j.mergeRouters(api, {
  project: project_router,
  section: section_router,
});

export type AppRouter = typeof app_router;

export default app_router;
