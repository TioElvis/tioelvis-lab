import { jstack } from "jstack";

interface Env {
  Bindings: { DATABASE_URL: string };
}

export const j = jstack.init<Env>();

export const PublicProcedure = j.procedure;
