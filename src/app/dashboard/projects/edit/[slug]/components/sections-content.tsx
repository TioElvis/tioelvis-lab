import { Fragment } from "react/jsx-runtime";
import { SectionCard } from "./section-card";
import { Project, Section } from "@prisma/client";
import { CreateSectionButton } from "./create-section-button";

interface Props {
  project: Readonly<Project & { sections: Readonly<Section>[] }>;
}

export function SectionsContent({ project }: Props) {
  const sections = project.sections.filter(
    (section) => section.parent_id === null
  );

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
            {project.sections.map((section) => {
              return (
                <SectionCard
                  key={section.id}
                  section={section}
                  list_sections={sections}
                  project_id={project.id}
                  project_slug={project.slug}
                />
              );
            })}
          </Fragment>
        )}
      </div>
      <CreateSectionButton list_sections={sections} project_id={project.id} />
    </section>
  );
}
