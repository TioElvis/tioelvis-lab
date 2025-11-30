import { PlusIcon } from "lucide-react";
import { SectionCard } from "./section-card";
import { Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Project, Section } from "@prisma/client";

interface Props {
  project: Readonly<Project & { sections: Readonly<Section>[] }>;
}

export function SectionsContent({ project }: Props) {
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
              return <SectionCard key={section.id} {...section} />;
            })}
          </Fragment>
        )}
      </div>
      <Button className="flex-1 xl:col-span-1 h-fit">
        Add Section
        <PlusIcon />
      </Button>
    </section>
  );
}
