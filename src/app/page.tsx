import { BackgroundBeams } from "@/components/ui/background-beams";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { projects } from "@/types/Projects";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-full min-h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-start antialiased p-16">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Hi, Welcome to my Website
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          I am Praneeth
        </p>
      </div>
      <div className="max-w-5xl mx-auto px-8">
        <HoverEffect items={projects} />
      </div>
      <BackgroundBeams />
    </main>
  );
}
