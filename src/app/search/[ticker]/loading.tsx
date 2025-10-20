import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading(): JSX.Element {
  const ROWS = 6;

  return (
    <div className="p-6 max-w-4xl mx-auto" aria-busy="true" aria-live="polite">
      {/* header / title */}
      <div className="mb-4">
        <Skeleton className="h-8 w-36" />
        <div className="mt-2">
          <Skeleton className="h-4 w-64" />
        </div>
      </div>

      {/* list of year rows */}
      <div className="space-y-3">
        {Array.from({ length: ROWS }).map((_, i) => (
          <div
            key={i}
            className="block w-full"
          >
            <div className="w-full flex items-center justify-between p-4 bg-card border rounded-lg">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-3 w-40" />
              </div>
              <div className="flex flex-col gap-2 items-end">
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        ))}
        <div className="text-sm text-muted-foreground">Loading filings…</div>
      </div>
    </div>
  );
}