import React from "react";
import Image from "next/image";

function ProjectImage({ name, alt }: { name: string; alt: string }) {
  return (
    <header
      className="z-10 mb-2 mt-1 text-xs font-semibold  tracking-wide text-slate-500 sm:col-span-2 flex flex-col gap-4"
      aria-label={alt}
    >
      <Image src={`/${name}`} width={100} height={100} alt={alt} />
    </header>
  );
}

export default ProjectImage;
