import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="grid xl:grid-cols-6 gap-4 py-8">
      <section className="xl:col-span-3">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2" />
          </CardHeader>
          <CardContent className="space-y-8">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="min-h-72 w-full" />
          </CardContent>
        </Card>
      </section>
      <section className="xl:col-span-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2" />
          </CardHeader>
          <CardContent className="space-y-8">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-6 w-full" />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
