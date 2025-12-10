import { Fragment } from "react/jsx-runtime";
import { SectionCard } from "./section-card";
import { Project, Section } from "@prisma/client";
import { CreateSectionButton } from "./create-section-button";

interface Props {
  project: Readonly<Project & { sections: Readonly<Section>[] }>;
}

export function SectionsContent({ project }: Props) {
  const root_sections = project.sections
    .filter((section) => section.parent_id === null)
    .sort((a, b) => a.order - b.order);

  const getChildSections = (parent_id: string) => {
    return project.sections
      .filter((section) => section.parent_id === parent_id)
      .sort((a, b) => a.order - b.order);
  };

  return (
    <section className="py-4 flex flex-col-reverse xl:grid xl:grid-cols-8 gap-4">
      <div className="flex-1 xl:col-span-7 space-y-2">
        {project.sections.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No sections added yet. Click &#34;Add Section&#34; to create your
            first section.
          </p>
        )}
        {project.sections.length > 0 && (
          <Fragment>
            {root_sections.map((section) => {
              const child_sections = getChildSections(section.id);

              return (
                <Fragment key={section.id}>
                  <SectionCard
                    section={section}
                    list_sections={root_sections}
                    project_id={project.id}
                    project_slug={project.slug}
                  />

                  {child_sections.map((child_section) => (
                    <SectionCard
                      key={child_section.id}
                      section={child_section}
                      list_sections={root_sections}
                      project_id={project.id}
                      project_slug={project.slug}
                    />
                  ))}
                </Fragment>
              );
            })}
          </Fragment>
        )}
      </div>
      <CreateSectionButton
        list_sections={root_sections}
        project_id={project.id}
      />
    </section>
  );
}
