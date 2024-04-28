"use server";

import { RegisterRequest } from "@/app/auth/components/auth-form";
import { LoginRequest } from "@/app/auth/components/login-form";
import AuthResponse from "@/types/AuthResponse";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function createUser(requestData: RegisterRequest) {
  const cookiesList = cookies();

  const response = await fetch(`${process.env.API_URL}/users/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...requestData }),
  });

  const result = await response.json();

  const refreshToken = response.headers.get("refreshToken");
  const accessToken = response.headers.get("accessToken");
  accessToken ? cookiesList.set("accessToken", accessToken) : null;
  refreshToken ? cookiesList.set("refreshToken", refreshToken) : null;
  const user = result.data;
  cookiesList.set("authUser", JSON.stringify(user));

  return result;
}

export async function login(formData: LoginRequest) {
  const cookiesList = cookies();
  const email = formData.email;
  const password = formData.password;
  const response = await fetch(`${process.env.API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const result: AuthResponse = await response.json();

  if (result.success) {
    const refreshToken = response.headers.get("refreshToken");
    const accessToken = response.headers.get("accessToken");
    accessToken ? cookiesList.set("accessToken", accessToken) : null;
    refreshToken ? cookiesList.set("refreshToken", refreshToken) : null;
    const user = result.data;
    cookiesList.set("authUser", JSON.stringify(user));

    redirect("/");
  }

  return result;
}

export async function logout() {
  const cookiesList = cookies();
  await cookiesList.delete("accessToken");
  await cookiesList.delete("refreshToken");
  await cookiesList.delete("authUser");
  redirect("/auth/login");
}
