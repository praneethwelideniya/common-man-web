"use server";
import { AddUserCreditorRequest } from "@/app/dashboard/debt/users/create/page";
import UserResponse, { UserType } from "@/types/UserRespose";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function searchUsers(email: string) {
  const cookiesList = cookies();
  const accessToken = cookiesList.get("accessToken");
  const response = await fetch(
    `${process.env.API_URL}/users/search?q=${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
    }
  );

  if (response.status === 401) {
    cookiesList.delete("accessToken");
    cookiesList.delete("refreshToken");
    redirect("/auth/login");
  }
  const result: UserResponse = await response.json();

  if (result.success) {
    return result.data as UserType[];
  }
}

export async function addCreditors(formData: AddUserCreditorRequest) {
  revalidateTag("creditors");
  const cookiesList = cookies();
  const requestData = formData;
  console.log("formData", requestData);
  const accessToken = cookiesList.get("accessToken");
  const response = await fetch(`${process.env.API_URL}/users/creditors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken?.value}`,
    },
    body: JSON.stringify(requestData),
  });

  if (response.status === 401) {
    cookiesList.delete("accessToken");
    cookiesList.delete("refreshToken");
    redirect("/auth/login");
  }
  const result: UserResponse = await response.json();
  console.log("response", result);
  if (result.success) {
    redirect("/dashboard/debt/users");
  } else {
    return result.data as UserType[];
  }
}

export async function getCreditors() {
  const cookiesList = cookies();
  const accessToken = cookiesList.get("accessToken");
  const response = await fetch(`${process.env.API_URL}/users/creditors`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });

  if (response.status === 401) {
    cookiesList.delete("accessToken");
    cookiesList.delete("refreshToken");
    redirect("/auth/login");
  }
  const result: UserResponse = await response.json();

  if (result.success) {
    return result.data as UserType[];
  }
}

// get users/lendings
export async function getLendings() {
  const cookiesList = cookies();
  const accessToken = cookiesList.get("accessToken");
  const response = await fetch(`${process.env.API_URL}/users/lendings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });

  if (response.status === 401) {
    cookiesList.delete("accessToken");
    cookiesList.delete("refreshToken");
    redirect("/auth/login");
  }
  const result = await response.json();

  if (result.success) {
    return result.data as UserType[];
  }
}
// get users/borrowings
export async function getBorrowings() {
  const cookiesList = cookies();
  const accessToken = cookiesList.get("accessToken");
  const response = await fetch(`${process.env.API_URL}/users/borrowings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });

  if (response.status === 401) {
    cookiesList.delete("accessToken");
    cookiesList.delete("refreshToken");
    redirect("/auth/login");
  }
  const result = await response.json();

  if (result.success) {
    return result.data as UserType[];
  }
}
