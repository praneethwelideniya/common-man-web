"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/actions/auth";
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

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

export type LoginRequest = z.infer<typeof FormSchema>;

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserLoginForm({ className, ...props }: UserLoginFormProps) {
  const { pending } = useFormStatus();
  const { toast } = useToast();

  const form = useForm<LoginRequest>({
    resolver: zodResolver(FormSchema),
  });

  const createUserAction = async (formData: LoginRequest) => {
    const res: AuthResponse | undefined = await login(formData);

    if (res && !res.success) {
      toast({
        description: res.message,
      });
    }
  };

  return (
    <Form {...form}>
      {form.formState.isSubmitting && <Loader />}
      <form onSubmit={form.handleSubmit(createUserAction)}>
        <div className="grid gap-4">
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
          <div className="grid gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
          </div>
        </div>
      </form>
    </Form>
  );
}
