import { client } from "@/lib/client";
import { DetailsContent } from "./components/details-content";
import { SectionsContent } from "./components/sections-content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export default async function Page({ params }: Readonly<Props>) {
  const { slug } = await params;

  const response = await client.project.getBySlug.$get({ slug });

  const project = await response.json();

  return (
    <Tabs defaultValue="details">
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
