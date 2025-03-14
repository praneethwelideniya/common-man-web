import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMNM Debt App",
  description: "Loan/Expense planning app",
};

export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <div className="lg:p-6">{children}</div>;
}
