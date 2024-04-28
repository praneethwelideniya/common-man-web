import React from "react";

function About({ description }: { description: string[] }) {
  return (
    <div>
      {description.map((desc, index) => (
        <div className="mb-4 text-light text-slate-300" key={index.toString()}>
          {desc}
        </div>
      ))}
    </div>
  );
}

export default About;
