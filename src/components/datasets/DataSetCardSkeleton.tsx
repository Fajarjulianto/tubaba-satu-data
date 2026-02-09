import { Card, CardContent } from "@/components/index";

export const DatasetCardSkeleton = () => {
  return (
    <Card className="rounded-[32px] border-slate-100 shadow-sm overflow-hidden h-full flex flex-col">
      <CardContent className="p-6 md:p-8 flex flex-col h-full space-y-5">
        {/* Badge & Meta Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <div className="h-5 w-16 bg-slate-200 rounded-full animate-pulse" />
            <div className="h-5 w-12 bg-slate-100 rounded-full animate-pulse" />
          </div>
          <div className="h-4 w-20 bg-slate-100 rounded animate-pulse" />
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-6 w-full bg-slate-200 rounded-lg animate-pulse" />
          <div className="h-6 w-3/4 bg-slate-200 rounded-lg animate-pulse" />
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2 flex-1">
          <div className="h-3 w-full bg-slate-100 rounded animate-pulse" />
          <div className="h-3 w-full bg-slate-100 rounded animate-pulse" />
          <div className="h-3 w-1/2 bg-slate-100 rounded animate-pulse" />
        </div>

        {/* Footer Skeleton */}
        <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="flex gap-4">
            <div className="h-4 w-12 bg-slate-100 rounded animate-pulse" />
            <div className="h-4 w-12 bg-slate-100 rounded animate-pulse" />
          </div>
          <div className="h-8 w-24 bg-slate-200 rounded-xl animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
};
