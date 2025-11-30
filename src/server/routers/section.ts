import z from "zod";
import { db } from "@/lib/db";
import { Section } from "@prisma/client";
import { SectionZodSchema } from "@/lib/schemas";
import { j, private_procedure } from "../jstack";
import { HTTPException } from "hono/http-exception";

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
          throw new HTTPException(400, {
            message:
              "Cannot create a subsection of a subsection. Only 2 levels are allowed.",
          });
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

  update: private_procedure
    .input(
      z
        .object({
          section_id: z.string(),
          project_id: z.string(),
        })
        .merge(SectionZodSchema)
    )
    .post(async ({ c, input }) => {
      const { section_id, project_id, title, slug, icon, parent_id } = input;

      const currentSection = await db.section.findUnique({
        where: { id: section_id },
        select: {
          parent_id: true,
          order: true,
          id: true,
        },
      });

      if (!currentSection) {
        return c.json({ error: "Section not found" }, 404);
      }

      // First check: Do not allow moving a root section to another root section
      if (currentSection.parent_id === null && parent_id !== null) {
        const newParent = await db.section.findUnique({
          where: { id: parent_id },
          select: { parent_id: true },
        });

        if (!newParent) {
          return c.json({ error: "Parent section not found" }, 404);
        }

        if (newParent.parent_id !== null) {
          throw new HTTPException(400, {
            message:
              "Cannot move a root section to a subsection. Only 2 levels are allowed.",
          });
        }
      }

      // Second check: Do not allow moving a subsection to another subsection
      if (parent_id) {
        const parentSection = await db.section.findUnique({
          where: { id: parent_id },
          select: { parent_id: true },
        });

        if (parentSection?.parent_id !== null) {
          throw new HTTPException(400, {
            message:
              "Cannot create a subsection of a subsection. Only 2 levels are allowed.",
          });
        }
      }

      // Third check: Don't allow circular relationships
      if (parent_id === section_id) {
        throw new HTTPException(400, {
          message: "A section cannot be its own parent.",
        });
      }

      // Fourth check: If the section has children, it cannot become a subsection
      if (parent_id !== null) {
        const hasChildren = await db.section.findFirst({
          where: { parent_id: section_id },
        });

        if (hasChildren) {
          throw new HTTPException(400, {
            message:
              "Cannot move a section with children to become a subsection.",
          });
        }
      }

      // Check if parent_id changed
      const parentChanged = currentSection.parent_id !== (parent_id || null);
      let newOrder = currentSection.order;

      if (parentChanged) {
        // Step 1: Get the new order in the target group
        const maxOrderSection = await db.section.findFirst({
          where: {
            project_id,
            parent_id: parent_id || null,
          },
          orderBy: { order: "desc" },
          select: { order: true },
        });

        newOrder = maxOrderSection ? maxOrderSection.order + 1 : 1;

        // Step 2: For the original group, reorder the sections
        // Get all sections in the original group that come after the moved section
        const sectionsToReorder = await db.section.findMany({
          where: {
            project_id,
            parent_id: currentSection.parent_id,
            order: { gt: currentSection.order },
          },
          orderBy: { order: "asc" },
        });

        // Step 3: Update the order of each section (subtract 1 from each)
        for (const section of sectionsToReorder) {
          await db.section.update({
            where: { id: section.id },
            data: { order: section.order - 1 },
          });
        }
      }

      // Step 4: Update the main section
      const updatedSection = await db.section.update({
        where: { id: section_id },
        data: {
          title,
          slug,
          icon,
          parent_id: parent_id || null,
          order: newOrder,
        },
        select: {
          id: true,
          title: true,
          slug: true,
          order: true,
          parent_id: true,
          icon: true,
        },
      });

      return c.superjson(updatedSection);
    }),
});
