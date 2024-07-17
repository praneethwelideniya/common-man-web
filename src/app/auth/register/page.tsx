// import { Metadata } from "next";
// import Image from "next/image";
// import Link from "next/link";

// import { cn } from "@/lib/utils";
// import { buttonVariants } from "@/components/ui/button";
// import { UserAuthForm } from "@/app/auth/components/auth-form";

// export const metadata: Metadata = {
//   title: "Create User",
//   description: "Registration form.",
// };

// export default function AuthenticationPage() {
//   return (
//     <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
//       <div className="flex flex-col space-y-2 text-center">
//         <h1 className="text-2xl font-semibold tracking-tight">
//           Create an account
//         </h1>
//         <p className="text-sm text-muted-foreground">
//           Enter your details below to create your account
//         </p>
//       </div>
//       <UserAuthForm />
//       <p className="px-8 text-center text-sm text-muted-foreground">
//         By clicking continue, you agree to our{" "}
//         <Link
//           href="/terms"
//           className="underline underline-offset-4 hover:text-primary"
//         >
//           Terms of Service
//         </Link>{" "}
//         and{" "}
//         <Link
//           href="/privacy"
//           className="underline underline-offset-4 hover:text-primary"
//         >
//           Privacy Policy
//         </Link>
//         .
//       </p>
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
import { UserAuthForm } from "@/app/auth/components/auth-form";

export default function AuthenticationPage() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserAuthForm />
        <div className="my-2">
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms-conditions"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms and conditions
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy-policy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
