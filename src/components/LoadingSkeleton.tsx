import { Skeleton } from '@/components/ui/skeleton';

export function MetricCardSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border/50 shadow-card p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-12 w-12 rounded-xl" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border/50 shadow-card p-6">
      <Skeleton className="h-6 w-48 mb-6" />
      <div className="h-[300px] flex items-end justify-around gap-2 px-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton
            key={i}
            className="w-full animate-pulse-gentle"
            style={{
              height: `${Math.random() * 60 + 20}%`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function MapSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border/50 shadow-card p-6">
      <Skeleton className="h-6 w-48 mb-6" />
      <div className="aspect-square max-w-md mx-auto relative">
        <Skeleton className="w-full h-full rounded-xl" />
        {[...Array(5)].map((_, i) => (
          <Skeleton
            key={i}
            className="absolute w-20 h-16 rounded-xl"
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + i * 12}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function FilterPanelSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border/50 shadow-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-6 w-40" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <FilterPanelSkeleton />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <MetricCardSkeleton key={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSkeleton />
        <MapSkeleton />
      </div>
    </div>
  );
}
