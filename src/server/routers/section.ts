import z from "zod";
import { db } from "@/lib/db";
import { Section } from "@prisma/client";
import { SectionZodSchema } from "@/lib/schemas";
import { j, private_procedure } from "../jstack";

export const section_router = j.router({
  create: private_procedure
    .input(z.object({ project_id: z.string() }).merge(SectionZodSchema))
    .post(async ({ c, input }) => {
      const { project_id, title, slug, icon, parent_id } = input;

      if (parent_id) {
        const parentSection = await db.section.findUnique({
          where: { id: parent_id },
          select: { parent_id: true },
        });

        if (parentSection?.parent_id !== null) {
          return c.json(
            {
              error:
                "Cannot create a subsection of a subsection. Only 2 levels are allowed.",
            },
            400
          );
        }
      }

      const maxOrderSection = await db.section.findFirst({
        where: {
          project_id,
          parent_id: parent_id || null,
        },
        orderBy: { order: "desc" },
        select: { order: true },
      });

      const nextOrder = maxOrderSection ? maxOrderSection.order + 1 : 1;

      const payload: Omit<Section, "id" | "createdAt" | "updatedAt"> = {
        title,
        slug,
        content: "",
        order: nextOrder,
        parent_id: parent_id || null,
        project_id,
        icon,
      };

      const newSection = await db.section.create({
        data: { ...payload },
        select: {
          id: true,
          title: true,
          order: true,
          parent_id: true,
        },
      });

      return c.superjson(newSection);
    }),
});
