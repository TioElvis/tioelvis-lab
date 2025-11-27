import { db } from "@/lib/db";
import { ProjectSchema } from "@/lib/schemas";
import { j, private_procedure, public_procedure } from "../jstack";

export const project_router = j.router({
  getProjects: public_procedure.query(async ({ c }) => {
    const projects = await db.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return c.superjson(projects);
  }),

  create: private_procedure
    .input(ProjectSchema)
    .mutation(async ({ ctx, input, c }) => {
      const { user } = ctx;

      const project = await db.project.create({
        data: {
          ...input,
          author_id: user.id,
        },
      });

      return c.superjson(project);
    }),
});
