import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

function DebtLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Debt</h1>
      </div>
      <div className="flex-1 p-4 flex-col h-full justify-center">
        {children}
      </div>
    </>
  );
}

export default DebtLayout;
