"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export type CreateButtonType = "User" | "Debt";
function CreateButton({
  size = "sm",
  type,
  route,
}: {
  size?: "sm" | "lg" | "default";
  type?: CreateButtonType;
  route: string;
}) {
  const router = useRouter();
  return (
    <Button
      size={size}
      className="h-8 gap-1"
      onClick={() => {
        router.push(route);
      }}
    >
      <PlusCircle className="h-3.5 w-3.5" />
      <span className="sm:whitespace-nowrap">{`${type} Create`}</span>
    </Button>
  );
}

export default CreateButton;
