import React from "react";

function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className=" bg-slate-900">{children}</div>;
}

export default PortfolioLayout;
