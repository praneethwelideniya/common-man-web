import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import "./globals.css";
import { Inter as FontSans, Anton } from "next/font/google";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CMNM Debt App",
  description: "Loan/Expense planning app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

{
  /* <ClerkProvider>
<html lang="en">
  <body
    className={cn(
      "min-h-screen bg-background font-sans antialiased",
      fontSans.variable
    )}
  >
    <SignedOut>
      <SignInButton />
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
    {children}
    <Toaster />
  </body>
</html>
</ClerkProvider> */
}
