"use client";
import { Button } from "@/components/ui/button";
import { track } from "@vercel/analytics/react";
import Link from "next/link";
import React from "react";

function DownloadTrack({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      onClick={() => {
        track("Resume Download");
        console.log("ela");
      }}
    >
      {children}
    </div>
  );
}

export default DownloadTrack;
