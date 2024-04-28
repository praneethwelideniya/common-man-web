export type TimeRangeType = {
  start: string;
  end?: string;
};

export type ExperienceType = {
  timeRange: TimeRangeType;
  position: string;
  company: { name: string; link: string };
  description: string;
  technologies: string[];
};

export type ProjectsType = {
  image: { name: string; alt: string };
  title: string;
  description: string;
  technologies: string[];
  link: string;
};

export type ExproType = {
  children: React.ReactNode;
  title: string;
  link: string;
  description: string;
  tags?: string[];
  linkTags?: { url: string; name: string }[];
};

export enum SocialMediaEnum {
  LinkedIn = "LinkedIn",
  GitHub = "GitHub",
  Twitter = "Twitter",
  Email = "Email",
  Instagram = "Instagram",
  Facebook = "Facebook",
  YouTube = "YouTube",
  Reddit = "Reddit",
  Pinterest = "Pinterest",
  Tumblr = "Tumblr",
  Snapchat = "Snapchat",
  WhatsApp = "WhatsApp",
  TikTok = "TikTok",
  Twitch = "Twitch",
  Discord = "Discord",
  Slack = "Slack",
  Telegram = "Telegram",
  Signal = "Signal",
  Skype = "Skype",
}
