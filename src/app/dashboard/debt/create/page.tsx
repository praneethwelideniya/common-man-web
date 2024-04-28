import { getCreditors } from "@/actions/users";
import DebtCreateForm from "@/app/dashboard/components/debt-create-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DebtCreatePage() {
  const cookiesList = cookies();
  const accessToken = cookiesList.get("accessToken");
  const response = await fetch(`${process.env.API_URL}/users/creditors`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken?.value}`,
    },
    cache: "no-cache",
  });

  if (response.status === 401) {
    redirect("/logout");
  } else if (response.status !== 200) {
  }

  const result = await response.json();

  return <DebtCreateForm creditors={result.data} />;
}
