"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import ColorPicker, { useColorPicker } from "react-best-gradient-color-picker";

export default function GradientPicker({
  color,
  setColor,
}: {
  color: string;
  setColor: (data: string) => void;
}) {
  const { setSolid, setGradient } = useColorPicker(color, setColor);

  return (
    <div>
      <ColorPicker value={color} onChange={setColor} height={150} />
    </div>
  );
}
