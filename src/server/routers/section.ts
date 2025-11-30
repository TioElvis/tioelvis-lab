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

      // Obtener la sección actual
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

      // VALIDACIÓN 1: No permitir mover una root section a otra root section
      if (currentSection.parent_id === null && parent_id !== null) {
        // Verificar que el nuevo parent sea válido
        const newParent = await db.section.findUnique({
          where: { id: parent_id },
          select: { parent_id: true },
        });

        if (!newParent) {
          return c.json({ error: "Parent section not found" }, 404);
        }

        // Si el nuevo parent es una subsección, no permitir
        if (newParent.parent_id !== null) {
          return c.json(
            {
              error:
                "Cannot move a root section to a subsection. Only 2 levels are allowed.",
            },
            400
          );
        }
      }

      // VALIDACIÓN 2: Si se está asignando un parent, verificar que no sea subsección
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

      // VALIDACIÓN 3: No permitir que una sección sea su propio parent
      if (parent_id === section_id) {
        return c.json(
          {
            error: "A section cannot be its own parent.",
          },
          400
        );
      }

      // VALIDACIÓN 4: Si la sección tiene hijos, no puede convertirse en subsección
      if (parent_id !== null) {
        const hasChildren = await db.section.findFirst({
          where: { parent_id: section_id },
        });

        if (hasChildren) {
          return c.json(
            {
              error:
                "Cannot move a section with children to become a subsection.",
            },
            400
          );
        }
      }

      // Si cambió el parent_id, recalcular el order
      let newOrder = currentSection.order;

      if (currentSection.parent_id !== (parent_id || null)) {
        const maxOrderSection = await db.section.findFirst({
          where: {
            project_id,
            parent_id: parent_id || null,
          },
          orderBy: { order: "desc" },
          select: { order: true },
        });

        newOrder = maxOrderSection ? maxOrderSection.order + 1 : 1;
      }

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
