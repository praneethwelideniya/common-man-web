import { ExperienceType, ProjectsType } from "@/app/portfolio/components/types";

export const dynamic = "force-dynamic"; // defaults to auto

type data = {
  name: string;
  title: string;
  subtitle: string;
  socials: { name: string; url: string }[];
  resume: string;
  sections: {
    name: string;
    id: string;
    content: string[] | ExperienceType[] | ProjectsType[];
  }[];
};

export async function GET(request: Request) {
  const data = {
    name: "Praneeth Welideniya",
    title: "Front-End & Mobile Developer",
    subtitle:
      "I craft seamless and innovative digital solutions for mobile and web",
    socials: [
      {
        name: "GitHub",
        url: "",
      },
    ],
    resume: "undefined",
    sections: [
      {
        name: "About",
        id: "about",
        content: [
          "I am a front-end and mobile developer with a passion for crafting seamless and innovative digital solutions. I have a keen eye for detail and a knack for creating pixel-perfect designs. I am proficient in HTML, CSS, JavaScript, and React. I am also experienced in developing mobile applications using React Native.",
          "I am a front-end and mobile developer with a passion for crafting seamless and innovative digital solutions. I have a keen eye for detail and a knack for creating pixel-perfect designs. I am proficient in HTML, CSS, JavaScript, and React. I am also experienced in developing mobile applications using React Native.",
          "I am a front-end and mobile developer with a passion for crafting seamless and innovative digital solutions. I have a keen eye for detail and a knack for creating pixel-perfect designs. I am proficient in HTML, CSS, JavaScript, and React. I am also experienced in developing mobile applications using React Native.",
        ],
      },
      {
        name: "Skills",
        id: "skills",
        content: [
          "HTML",
          "CSS",
          "JavaScript",
          "React",
          "React Native",
          "TypeScript",
          "Firebase",
        ],
      },
      {
        name: "Experience",
        id: "experience",
        content: [
          {
            timeRange: { start: "2023 May", end: "2023 Nov" },
            company: {
              name: "CareMaster",
              link: "https://caremaster.au.com",
            },
            position: "Software Developer(Mobil)",
            description:
              "Developed a mobile application for CareMaster using React Native.",
            technologies: ["React Native", "TypeScript", "Firebase"],
          },
          {
            timeRange: { start: "2023 May", end: "2023 Nov" },
            company: {
              name: "CareMaster",
              link: "https://caremaster.au.com",
            },
            position: "Software Developer(Mobil)",
            description:
              "Developed a mobile application for CareMaster using React Native.",
            technologies: ["React Native", "TypeScript", "Firebase"],
          },
          {
            timeRange: { start: "2023 May", end: "2023 Nov" },
            company: {
              name: "CareMaster",
              link: "https://caremaster.au.com",
            },
            position: "Software Developer(Mobil)",
            description:
              "Developed a mobile application for CareMaster using React Native.",
            technologies: ["React Native", "TypeScript", "Firebase"],
          },
        ],
      },
      {
        name: "Projects",
        id: "projects",
        content: [
          {
            title: "Project 1",
            description: "Description 1",
            link: "https://link1.com",
            technologies: ["React", "TypeScript", "Firebase"],
            image: { name: "genie-logo.png", alt: "alt1" },
          },
        ],
      },
      // {
      //   name: "Education",
      //   id: "education",
      // },
      // {
      //   name: "Contact",
      //   id: "contact",
      // },
    ],
  };
  return Response.json({ status: 200, data });
}
