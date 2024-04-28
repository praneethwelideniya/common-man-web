import { TimeRangeType } from "@/app/portfolio/components/types";
import React from "react";

function TimeRange({ start, end = "Present" }: TimeRangeType) {
  return (
    <header
      className="z-10 mb-2 mt-1 text-xs font-semibold  tracking-wide text-slate-500 sm:col-span-2 flex flex-col gap-4 items-start"
      aria-label={`${start} to ${end}`}
    >
      <div> {`${start}`}</div>

      <div> {`${end}`}</div>
    </header>
  );
}

export default TimeRange;
