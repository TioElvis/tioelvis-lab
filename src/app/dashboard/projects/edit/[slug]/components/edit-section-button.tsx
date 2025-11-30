"use client";
import { useMemo } from "react";
import { Section } from "@prisma/client";
import { SectionFormData } from "@/lib/schemas";
import EditSectionContent from "./edit-section-content";

interface Props {
  project_id: string;
  section: Section;
  list_sections: Array<Section>;
}

export function EditSectionButton({
  project_id,
  section,
  list_sections,
}: Readonly<Props>) {
  const defaultValues: SectionFormData = useMemo(() => {
    if (!section) {
      return {
        title: "",
        slug: "",
        order: 0,
        parent_id: null,
        icon: "",
      };
    }

    return {
      title: section.title,
      slug: section.slug,
      order: section.order,
      parent_id: section.parent_id,
      icon: section.icon,
    };
  }, [section]);

  return (
    <EditSectionContent
      project_id={project_id}
      section_id={section.id}
      defaultValues={defaultValues}
      list_sections={list_sections}
    />
  );
}
