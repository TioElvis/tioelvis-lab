import { client } from "@/lib/client";
import { CardProject } from "@/components/card-project";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

export async function FeaturedProjects() {
  const response = await client.project.getProjects.$get({ page: 1, limit: 6 });
  const projects = await response.json();

  return (
    <MaxWidthWrapper className="my-32">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          Featured Projects
        </h2>
        <p className="text-muted-foreground text-lg">
          Real projects, real code, real learnings
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 && (
          <p className="text-center col-span-full text-muted-foreground">
            No featured projects available at the moment.
          </p>
        )}
        {projects.length > 0 &&
          projects.map((project) => (
            <CardProject key={project.id} {...project} />
          ))}
      </div>
    </MaxWidthWrapper>
  );
}
