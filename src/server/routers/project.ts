import { z } from "zod";
import { j } from "../jstack";
import { db } from "@/lib/db";

export const project_router = j.router({
  getProjects: j.procedure
    .input(z.object({ page: z.number(), limit: z.number().max(50) }))
    .query(async ({ c, input }) => {
      const { page, limit } = input;

      const projects = await db.project.findMany({
        take: limit,
        skip: (page - 1) * limit,
      });

      return c.superjson(projects);
    }),
});
