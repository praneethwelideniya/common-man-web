import ExProCard from "@/app/portfolio/components/exprocard";
import TimeRange from "@/app/portfolio/components/time-range";
import { ExperienceType } from "@/app/portfolio/components/types";
import { ArrowUpRightIcon } from "lucide-react";
import React from "react";

function Experience({ experiences }: { experiences: ExperienceType[] }) {
  return (
    <ol className="group/list">
      {experiences.map((experience, index) => (
        <li className="mb-12">
          <ExProCard
            title={`${experience.position} - ${experience.company.name}`}
            description={experience.description}
            link={experience.company.link}
            tags={experience.technologies}
          >
            <TimeRange {...experience.timeRange} />
          </ExProCard>
        </li>
      ))}
    </ol>
  );
}
export default Experience;
