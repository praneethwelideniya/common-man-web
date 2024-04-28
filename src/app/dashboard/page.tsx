import { Activity, CreditCard, DollarSign } from "lucide-react";

import NoContenctUi from "@/app/dashboard/components/no-content";
import UpcomingPayments from "@/app/dashboard/components/upcoming-payments";
import UsersOwes from "@/app/dashboard/components/users-owes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardResponse } from "@/types/UserOwesResponse";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const cookiesList = cookies();
  const accessToken = cookiesList.get("accessToken");
  const response = await fetch(`${process.env.API_URL}/users/dashboard`, {
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
  console.log(result);
  const {
    totalOweTo,
    totalOweFrom,
    upcomingPayments,
    userOwes,
  }: DashboardResponse = result.data;

  const { paymentDueToday, receiveDueToday } = upcomingPayments.reduce(
    (acc, curr) => {
      const con = new Date(curr.dueDate).getTime() <= new Date().getTime();
      if (con) {
        curr.type == "PAYMENT"
          ? (acc.paymentDueToday += curr.amount)
          : (acc.receiveDueToday += curr.amount);
      }
      return acc;
    },
    { paymentDueToday: 0, receiveDueToday: 0 }
  );

  // const receiveDueToday = upcomingReceives.reduce((acc, curr) => {
  //   return new Date(curr.dueDate).getTime() <= new Date().getTime()
  //     ? acc + curr.amount
  //     : acc;
  // }, 0);

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-4 grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0" className=" bg-red-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">You Owe</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$ {totalOweTo.toFixed(2)}</div>
            {/* <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1" className=" bg-green-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Owes you</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $ {totalOweFrom.toFixed(2)}
            </div>
            {/* <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2" className=" bg-red-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $ {paymentDueToday.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              today - {new Date().toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3" className=" bg-green-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Due receivables
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $ {receiveDueToday.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              today - {new Date().toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>
      {userOwes.length > 0 ? (
        <div className="grid gap-4">
          <div>
            <UsersOwes userOwes={userOwes} actionButton="VIEWALL" />
          </div>

          <div>
            <UpcomingPayments
              upcomingPayments={upcomingPayments}
              showViewAll={true}
            />
          </div>
        </div>
      ) : (
        <NoContenctUi
          title="You have no any users or debts"
          type="User"
          route={"/dashboard/debt/users/create"}
        />
      )}
    </div>
  );
}
