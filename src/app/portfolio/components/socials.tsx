import { SocialMediaEnum } from "@/app/portfolio/components/types";
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { Linkedin, Link as LinkIcon, TwitterIcon, X } from "lucide-react";
import Link from "next/link";
import React from "react";

function Socials({
  socials = [],
}: {
  socials: { name: string; url: string }[];
}) {
  const getLog = (type: SocialMediaEnum) => {
    switch (type) {
      case SocialMediaEnum.GitHub:
        return <GitHubLogoIcon className=" w-6 h-6" />;
      case SocialMediaEnum.LinkedIn:
        return <Linkedin className=" w-6 h-6" />;
      case SocialMediaEnum.Twitter:
        <TwitterIcon className=" w-6 h-6" />;
        break;
      case SocialMediaEnum.Instagram:
        return <InstagramLogoIcon className=" w-6 h-6" />;
      default:
        return <LinkIcon className=" w-6 h-6" />;
    }
  };
  return (
    <ul className="ml-1 mt-8 flex flex-row">
      {socials.map((social, index) => (
        <li className="mr-5 text-xs shrink-0" key={index.toString()}>
          <Link href={social.url} target="_blank" rel="noreferrer noopener">
            {getLog(social.name as SocialMediaEnum)}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Socials;
