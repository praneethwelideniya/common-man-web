import TagsList from "@/app/portfolio/components/tags-list";
import TimeRange from "@/app/portfolio/components/time-range";
import { ExperienceType, ExproType } from "@/app/portfolio/components/types";
import { ArrowUpRightIcon, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function ExProCard({
  children,
  title,
  link,
  description,
  tags,
  linkTags,
}: ExproType) {
  return (
    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
      {children}
      <div className="z-10 sm:col-span-6">
        <h3 className="font-medium leading-snug text-slate-200">
          <div>
            <Link
              className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300  group/link text-base"
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${title} (opens in a new tab)`}
            >
              <span>
                {title}
                <ArrowUpRightIcon className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
              </span>
            </Link>
          </div>
        </h3>
        <p className="mt-2 text-sm font-light text-slate-400 leading-normal">
          {description}
        </p>
        {linkTags && (
          <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
            {linkTags?.map((link, index) => (
              <li className="mr-1.5 mt-2" key={index.toString()}>
                <a
                  href={"https://google.com"}
                  target="_blank"
                  rel="noreferrer noopener"
                  className=" text-slate-300 hover:text-slate-400 flex items-center gap-1 text-xs font-medium"
                >
                  <LinkIcon className={"w-3 h-3"} />
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        )}
        {tags && <TagsList tags={tags} />}
      </div>
    </div>
  );
}
export default ExProCard;
