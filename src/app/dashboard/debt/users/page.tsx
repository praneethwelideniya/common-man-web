import CreateButton from "@/app/dashboard/components/create-button";
import UsersOwes from "@/app/dashboard/components/users-owes";
import { UserOwesResponse } from "@/types/UserOwesResponse";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Creditors() {
  const cookiesList = cookies();
  const accessToken = cookiesList.get("accessToken");
  const response = await fetch(`${process.env.API_URL}/users/userOwes`, {
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
    console.log(response);
  }

  const result = await response.json();

  const userOwes: UserOwesResponse[] = result.data;

  return (
    <div className="grid gap-4">
      {/* <div className=" flex flex-col items-end ">
        <CreateButton
          size="sm"
          type="User"
          route={"/dashboard/debt/users/create"}
        />
      </div> */}
      <UsersOwes userOwes={userOwes} actionButton="CREATE" />
    </div>
  );
}
