import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Praneeth",
  description: "Portfolio of Praneeth Welideniya",
};

function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className=" bg-slate-900">{children}</div>;
}

export default PortfolioLayout;
