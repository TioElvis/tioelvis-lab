import { z } from "zod";
import { db } from "@/lib/db";
import { Languages } from "@prisma/client";
import { ProjectSchema } from "@/lib/schemas";
import { j, private_procedure, public_procedure } from "../jstack";

export const project_router = j.router({
  list: public_procedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(10),
        search: z.string().optional(),
        languages: z.array(z.nativeEnum(Languages)).optional(),
      })
    )
    .query(async ({ c, input }) => {
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
