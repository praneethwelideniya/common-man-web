import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slideo",
  description: "Create short videos using AI generated Slides",
};

export default function SlideoLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
