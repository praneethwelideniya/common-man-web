// import { Metadata } from "next";
// import Image from "next/image";
// import Link from "next/link";

// import { cn } from "@/lib/utils";
// import { buttonVariants } from "@/components/ui/button";
// import { UserLoginForm } from "@/app/auth/components/login-form";

// export const metadata: Metadata = {
//   title: "Create User",
//   description: "Registration form.",
// };

// export default function LoginPage() {
//   return (
//     <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
//       <div className="flex flex-col space-y-2 text-center">
//         <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
//         <p className="text-sm text-muted-foreground">
//           Enter your email and password
//         </p>
//       </div>
//       <UserLoginForm />
//     </div>
//   );
// }

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserLoginForm } from "@/app/auth/components/login-form";

export default function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm gap-2">
      <CardHeader className="flex flex-col space-y-2 text-center">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserLoginForm />
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
