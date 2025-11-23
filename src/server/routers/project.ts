import { z } from "zod";
import { db } from "@/lib/db";
import { ProjectSchema } from "@/lib/schemas";
import { HTTPException } from "hono/http-exception";
import { Languages } from "@/generated/prisma/enums";
import { j, private_procedure, public_procedure } from "../jstack";

export const project_router = j.router({
  getProjects: public_procedure
    .input(z.object({ page: z.number(), limit: z.number().max(50) }))
    .query(async ({ c, input }) => {
      const { page, limit } = input;

      const projects = await db.project.findMany({
        take: limit,
        skip: (page - 1) * limit,
      });

      return c.superjson(projects);
    }),

  createProject: private_procedure
    .input(
      ProjectSchema.extend({
        languages: z.array(z.nativeEnum(Languages)),
        tags: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ c, ctx, input }) => {
      const { slug } = input;

      const project = await db.project.findUnique({
        where: { slug },
      });

      if (project !== null) {
        throw new HTTPException(400, {
          message: "There is a project with this slug",
        });
      }

      const newProject = await db.project.create({
        data: {
          ...input,
          author_id: ctx.user.id,
        },
      });

      return c.superjson(newProject);
    }),
});
