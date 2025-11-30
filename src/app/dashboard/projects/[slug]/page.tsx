import { client } from "@/lib/client";
import { DetailsContent } from "./components/details-content";
import { SectionsContent } from "./components/sections-content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Readonly<Props>) {
  const { slug } = await params;

  const response = await client.project.getBySlug.$get({ slug });

  if (!response.ok) {
    return <div className="py-4">Failed to load project.</div>;
  }

  const project = await response.json();

  return (
    <Tabs defaultValue="details" className="flex-1 py-4">
      <TabsList>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="sections">Sections</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <DetailsContent {...project} />
      </TabsContent>
      <TabsContent value="sections">
        <SectionsContent project={project} />
      </TabsContent>
    </Tabs>
  );
}
