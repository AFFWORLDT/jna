import { Skeleton } from "@/src/components/ui/skeleton";

export default function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden border-none p-0 shadow-sm border-2 rounded-none animate-pulse">
      {/* image placeholder */}
      <Skeleton className="w-full h-96" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
