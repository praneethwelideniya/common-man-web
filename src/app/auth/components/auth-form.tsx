"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser, login } from "@/actions/auth";
import { useFormStatus } from "react-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AuthResponse from "@/types/AuthResponse";
import Loader from "@/components/Loader";
import { phoneRegex } from "@/types/UserRequest";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  fullName: z.string().min(2, {
    message: "Full Name must be at least 2 characters.",
  }),
  phoneNumber: z.string().regex(phoneRegex),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

export type RegisterRequest = z.infer<typeof FormSchema>;

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { pending } = useFormStatus();
  const { toast } = useToast();

  const form = useForm<RegisterRequest>({
    resolver: zodResolver(FormSchema),
  });

  const createUserAction = async (formData: RegisterRequest) => {
    // const res: AuthResponse = await login(formData);

    const res: AuthResponse = await createUser(formData);

    if (res.success) {
    } else {
      toast({
        description: res.message,
      });
    }
  };

  return (
    <Form {...form}>
      {form.formState.isSubmitting && <Loader />}
      <form
        onSubmit={form.handleSubmit(createUserAction)}
        className="space-y-2"
      >
        <div className="grid gap-2 2xl:gap-4">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jhon Wick"
                      disabled={pending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@email.com"
                      disabled={pending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0450000000"
                      disabled={pending}
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="******"
                      type="password"
                      disabled={pending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
          {/* <Button variant="outline" className="w-full">
              Sign up with GitHub
            </Button> */}
        </div>
      </form>
    </Form>
  );
}
