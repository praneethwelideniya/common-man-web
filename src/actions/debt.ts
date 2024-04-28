"use server";

import { logout } from "@/actions/auth";
import { DebtRequestType } from "@/app/dashboard/components/debt-create-form";
import ApiResponse from "@/types/ApiResponse";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createDebt(formData: DebtRequestType) {
  revalidateTag("debts");
  const cookiesList = cookies();
  const requestData = formData;

  const accessToken = cookiesList.get("accessToken");
  const response = await fetch(`${process.env.API_URL}/debts`, {
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
  const result: ApiResponse & { data: any } = await response.json();
  console.log("response", result);
  if (result.success) {
    redirect("/dashboard/debt/users");
  } else {
    return result.message;
  }
}

export async function repayDebt(formData: { _id: string; payAmount: number }) {
  revalidateTag("debts");
  const cookiesList = cookies();
  const requestData = formData;

  const accessToken = cookiesList.get("accessToken");
  const response = await fetch(`${process.env.API_URL}/debts/repay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken?.value}`,
    },
    body: JSON.stringify(requestData),
  });

  console.log({ response });

  if (response.status === 401) {
    logout();
  }
  const result: ApiResponse & { data: any } = await response.json();

  if (result.success) {
    redirect(`/dashboard/debt/${requestData._id}`);
  } else {
    return result.message;
  }
}

export async function deleteDebt(debtId: string) {
  revalidateTag("debts");
  const cookiesList = cookies();

  const accessToken = cookiesList.get("accessToken");
  const response = await fetch(`${process.env.API_URL}/debts/${debtId}`, {
    method: "Delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });

  console.log({ response });

  if (response.status === 401) {
    logout();
  }
  const result: ApiResponse & { data: any } = await response.json();

  if (result.success) {
    redirect(`/dashboard/debt`);
  } else {
    return result.message;
  }
}
