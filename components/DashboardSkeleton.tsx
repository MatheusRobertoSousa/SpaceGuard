import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={`metric-${index}`} className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-24" />
              </div>
              <Skeleton className="h-12 w-12 rounded-2xl" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </Card>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={`chart-${index}`} className="h-[320px] space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="h-[230px] w-full rounded-[1.5rem]" />
          </Card>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="h-[320px]">
          <Skeleton className="h-full w-full rounded-[1.5rem]" />
        </Card>
        <Card className="space-y-4">
          <Skeleton className="h-7 w-52" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-20 w-full rounded-[1.5rem]" />
          <Skeleton className="h-20 w-full rounded-[1.5rem]" />
          <Skeleton className="h-16 w-full rounded-[1.5rem]" />
        </Card>
      </section>
    </div>
  );
}
