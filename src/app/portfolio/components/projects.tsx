import ExProCard from "@/app/portfolio/components/exprocard";
import ProjectImage from "@/app/portfolio/components/project-image";
import TimeRange from "@/app/portfolio/components/time-range";
import { ExperienceType, ProjectsType } from "@/app/portfolio/components/types";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";

import React from "react";

function Projects({ projects }: { projects: ProjectsType[] }) {
  return (
    <ol className="group/list">
      {projects.map((project, index) => (
        <li className="mb-12">
          <ExProCard
            title={project.title}
            description={project.description}
            link={project.link}
            tags={project.technologies}
          >
            <ProjectImage {...project.image} />
          </ExProCard>
        </li>
      ))}
    </ol>
  );
}
export default Projects;
