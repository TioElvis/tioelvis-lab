import { db } from "@/lib/db";
import { auth } from "@/auth";
import { jstack } from "jstack";
import { HTTPException } from "hono/http-exception";

interface Env {
  Bindings: { DATABASE_URL: string };
}

export const j = jstack.init<Env>();

const auth_middleware = j.middleware(async ({ next }) => {
  const session = await auth();

  if (!session) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  const user_id = session?.user?.id;

  const user = await db.user.findUnique({
    where: { id: user_id },
  });

  if (user === null) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  return next({ user });
});

export const public_procedure = j.procedure;
export const private_procedure = public_procedure.use(auth_middleware);
