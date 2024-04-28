import clsx from "clsx";
import React from "react";

function TagsList({
  tags = [],
  size = "xs",
}: {
  tags: string[];
  size?: "xs" | "sm" | "md" | "lg";
}) {
  return (
    <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
      {tags?.map((tag, index) => (
        <li
          className={clsx("mr-1.5 mt-2", {
            "mb-1 mr-2": size === "sm",
            "mb-2 mr-2.5": size === "md",
            "mb-3 mr-3": size === "lg",
          })}
          key={index.toString()}
        >
          <div
            className={`flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-${size} font-medium leading-5 text-teal-300`}
          >
            {tag}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TagsList;
