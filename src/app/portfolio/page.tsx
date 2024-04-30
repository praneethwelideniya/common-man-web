import Navbar from "@/app/portfolio/components/navbar";
import Section from "@/app/portfolio/components/section";
import Socials from "@/app/portfolio/components/socials";
import { SocialMediaEnum } from "@/app/portfolio/components/types";
import { Download } from "lucide-react";
import Link from "next/link";

function PortfolioPage() {
  const data = {
    name: "Praneeth Welideniya",
    title: "Front-End & Mobile Developer",
    subtitle:
      "I craft seamless and innovative digital solutions for mobile and web",
    socials: [
      {
        name: SocialMediaEnum.GitHub,
        url: "https://github.com/praneethwelideniya?tab=repositories",
      },
      {
        name: SocialMediaEnum.LinkedIn,
        url: "https://www.linkedin.com/in/praneeth-welideniya",
      },
    ],
    resume: "/Praneeth_Welideniya_Resume.pdf",
    sections: [
      {
        name: "About",
        id: "about",
        content: [
          "I am an experienced software developer with over 5 years of professional expertise in mobile and front-end development, specializing in crafting seamless and innovative digital solutions. With a keen eye for detail and a knack for creating pixel-perfect designs, I bring proficiency in JavaScript, TypeScript, React, and React Native. Dedicated to producing high-quality software using Agile methodologies, I am committed to continuous learning and adaptability, ensuring that every solution meets both client and end-user expectations.",
        ],
      },
      {
        name: "Skills",
        id: "skills",
        content: [
          "JavaScript",
          "TypeScript",
          "React",
          "React Native",
          "NextJS",
          "NodeJs",
          "Express",
          "HTML",
          "CSS",
          "TailwindCSS",
          "MongoDB",
          "Java",
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
              name: "CareMaster (Australia)",
              link: "https://caremaster.au.com",
            },
            position: "Software Developer(Mobile)",
            description:
              "Worked as a mobile developer, responsible for designing and developing reusable UI components using TypeScript, app building, and release processes, publishing apps on App Store and Google Play Store, releasing app updates using code push, addressing backend API issues, and actively participating in Agile routines and ceremonies to ensure efficient project management.",
            technologies: [
              "React Native",
              "React",
              "TypeScript",
              "JavaScript",
              "Redux",
              "PHP",
              "Laravel",
            ],
          },
          {
            timeRange: { start: "2022 Jan", end: "2023 Feb" },
            company: {
              name: "Rootcode Labs (Sri Lanka)",
              link: "https://rootcodelabs.com",
            },
            position: "Senior Software Engineer",
            description:
              "Worked as a front-end and mobile app developer, responsible for designing and developing reusable UI components using TypeScript, app building, and release processes, publishing apps on App Store and Google Play Store, and actively participating in Agile routines and ceremonies to ensure efficient project management. ",
            technologies: [
              "TypeScript",
              "JavaScript",
              "React",
              "React Native",
              "NextJS",
              "NodeJs",
              "Express",
            ],
          },
          {
            timeRange: { start: "2020 Nov", end: "2022 Dec" },
            company: {
              name: "Hatchyard (Sri Lanka)",
              link: "https://hatchyard.io",
            },
            position: "Software Engineer",
            description:
              "Worked as a mobile developer, responsible for designing and developing reusable UI components using TypeScript, app building, and release processes, publishing apps on Google Play Store, and actively participating in Agile routines and ceremonies to ensure efficient project management. ",
            technologies: ["JavaScript", "React", "React Native"],
          },
          {
            timeRange: { start: "2018 Aug", end: "2020 Nov" },
            company: {
              name: "Virtusa (Sri Lanka)",
              link: "https://virtusa.com",
            },
            position: "Software Engineer",
            description:
              "Worked as a full stack developer, responsible for designing and developing web applications, APIs using Spring Boot, and mobile applications, while actively participating in Agile routines, practicing version control, and ensuring a well-rounded approach to software development. ",
            technologies: [
              "Java",
              "JavaScript",
              "Spring Boot",
              "React",
              "React Native",
            ],
          },
        ],
      },
      {
        name: "Projects",
        id: "projects",
        content: [
          {
            title: "Debt Management App (Commanman)",
            description:
              "This is a debt management web application built on Next.js, Express.js, and MongoDB. This platform empowers users to effortlessly track their debts, whether given or taken, and manage repayments through customizable installments. With a seamless user interface deployed on Vercel, and a robust backend hosted on Azure App Service, our solution ensures reliability and scalability.",
            link: "/debtapp",
            technologies: [
              "React",
              "NextJs",
              "TypeScript",
              "NodeJs",
              "Express",
              "mongoDB",
              "Azure App Service",
              "vercel",
            ],
            image: { name: "applogoblack.png", alt: "DebtApp" },
          },
          {
            title: "Workout App",
            description:
              "This is a React Native app, Designed and developed a comprehensive workout app tailored to muscle building, showcasing exercises categorized by targeted muscles and available equipment. Each exercise is accompanied by a detailed description, step-by-step instructions, and visual aids, including images demonstrating proper form and the specific muscles engaged. Committed to promoting effective fitness routines, I integrated features to facilitate users in achieving their fitness goals efficiently and safely.",
            link: "https://github.com/praneethwelideniya/workout",
            technologies: ["React", "React Native", "JavaScript", "Redux"],
            image: { name: "workoutapp.png", alt: "WorkoutAppLogo" },
          },
          {
            title: "Note taking App",
            description:
              "This is a React Native app, allowing users to create, categorize, and manage notes seamlessly. Implemented features such as customizable categories, client association, and persistent storage using Redux. Ensured type safety and code maintainability with TypeScript integration.",
            link: "https://github.com/praneethwelideniya/Note-App",
            technologies: [
              "React",
              "React Native",
              "TypeScript",
              "JavaScript",
              "Redux",
            ],
            image: { name: "noteapp.png", alt: "NoteAppLogo" },
          },
          {
            title: "Progressbar",
            description:
              "This is a simple and versatile ProgressBar component in React, perfect for visually indicating progress within applications",
            link: "https://github.com/praneethwelideniya/ProgressBarTest",
            technologies: [
              "React(Vite)",
              "TypeScript",
              "HTML",
              "CSS",
              "TailwindCSS",
            ],
            image: { name: "progressbar.png", alt: "ProgressBarLogo" },
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
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0 ">
      <div className="lg:flex lg:justify-between lg:gap-4">
        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24 text-white">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
              <a href="/">{data.name}</a>
            </h1>
            <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
              {data.title}
            </h2>
            <p className="mt-4 max-w-xs leading-normal">{data.subtitle}</p>
            {data?.resume && (
              <div className=" flex mt-4">
                <Link
                  href={data.resume}
                  download={true}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-full bg-teal-400/10 hover:bg-teal-100/10 px-3 py-1 text-lg font-medium leading-5 text-teal-300 hover:text-teal-400"
                >
                  Resume
                  <Download className=" ms-2 inline-block h-4 w-4 " />
                </Link>
              </div>
            )}
            <Navbar
              props={data.sections.map((data) => {
                const { name, id } = data;
                return { name, id };
              })}
            />
          </div>
          <div className="flex items-center">
            <Socials socials={data.socials} />
          </div>
        </header>
        <main className="pt-24 lg:w-1/2 lg:py-24 font-semibold text-white">
          {data.sections.map((section) => (
            <Section key={section.id} {...section} />
          ))}
        </main>
      </div>
    </div>
  );
}

export default PortfolioPage;
