import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading(): JSX.Element {
  // number of placeholder rows to show
  const ROWS = 6;

  return (
    <div className="p-6 max-w-5xl mx-auto" aria-busy="true" aria-live="polite">
      <div className="mb-4">
        <Skeleton className="h-8 w-40" />
        <div className="mt-2">
          <Skeleton className="h-4 w-72" />
        </div>
      </div>

      <div className="space-y-3">
        {/* header skeleton */}
        <div className="grid grid-cols-12 gap-4 items-center px-3 py-2 bg-card border rounded">
          <div className="col-span-6"><Skeleton className="h-4 w-full" /></div>
          <div className="col-span-2"><Skeleton className="h-4 w-full" /></div>
          <div className="col-span-2"><Skeleton className="h-4 w-full" /></div>
          <div className="col-span-2"><Skeleton className="h-4 w-full" /></div>
        </div>

        {/* rows */}
        {Array.from({ length: ROWS }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 bg-card border rounded"
          >
            <div className="flex-1">
              <Skeleton className="h-4 w-48" />
              <div className="mt-1">
                <Skeleton className="h-3 w-64" />
              </div>
            </div>

            <div className="ml-4 flex-shrink-0 space-y-1">
              <Skeleton className="h-4 w-24" />
              <div className="mt-1">
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
        ))}

        <div className="text-sm text-muted-foreground">Loading facts…</div>
      </div>
    </div>
  );
}