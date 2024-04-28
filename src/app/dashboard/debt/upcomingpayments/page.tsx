import UpcomingPayments from "@/app/dashboard/components/upcoming-payments";
import { UpcomingPaymentsType } from "@/types/UserOwesResponse";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

async function UpcomingPayPage() {
  const cookiesList = cookies();
  const accessToken = cookiesList.get("accessToken");
  const response = await fetch(
    `${process.env.API_URL}/users/upcomingPayments`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
      cache: "no-cache",
    }
  );

  if (response.status === 401) {
    redirect("/logout");
  } else if (response.status !== 200) {
  }

  const result = await response.json();
  console.log(result);
  const upcomingPayments: UpcomingPaymentsType[] = result.data;

  return <UpcomingPayments upcomingPayments={upcomingPayments} />;
}

export default UpcomingPayPage;
