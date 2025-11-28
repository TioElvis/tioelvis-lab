import z from "zod";
import { db } from "@/lib/db";
import { HTTPException } from "hono/http-exception";
import { j, private_procedure, public_procedure } from "../jstack";
import { ProjectListZodSchema, ProjectZodSchema } from "@/lib/schemas";

export const project_router = j.router({
  create: private_procedure
    .input(ProjectZodSchema)
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

  list: public_procedure
    .input(ProjectListZodSchema)
    .get(async ({ c, input }) => {
      const { page, limit, search, languages } = input;
      const skip = (page - 1) * limit;

      const where = {
        AND: [
          search
            ? {
                title: { contains: search, mode: "insensitive" as const },
              }
            : {},
          languages?.length
            ? {
                languages: { hasSome: languages },
              }
            : {},
        ],
      };

      const [projects, total] = await Promise.all([
        db.project.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
          include: { author: { select: { name: true } } },
        }),
        db.project.count({ where }),
      ]);

      return c.superjson({
        projects,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    }),

  getBySlug: public_procedure
    .input(z.object({ slug: z.string() }))
    .get(async ({ c, input }) => {
      const { slug } = input;

      const project = await db.project.findUnique({
        where: { slug },
        include: { author: { select: { name: true } } },
      });

      if (!project) {
        throw new HTTPException(404, { message: "Project not found" });
      }

      return c.superjson(project);
    }),

  update: private_procedure
    .input(z.object({ id: z.string() }).merge(ProjectZodSchema.partial()))
    .mutation(async ({ ctx, input, c }) => {
      const { user } = ctx;
      const { ...data } = input;

      const project = await db.project.findUnique({
        where: { id: data.id },
      });

      if (!project) {
        throw new HTTPException(404, { message: "Project not found" });
      }

      if (project.author_id !== user.id) {
        throw new HTTPException(403, { message: "Forbidden" });
      }

      const updatedProject = await db.project.update({
        where: { id: data.id },
        data,
      });

      return c.superjson(updatedProject);
    }),
});
