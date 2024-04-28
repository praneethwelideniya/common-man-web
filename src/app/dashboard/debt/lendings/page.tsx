import { Debt } from "@/types/Debt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import CreateButton from "@/app/dashboard/components/create-button";
import { UserCreditorEnum } from "@/app/dashboard/debt/users/create/page";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import NoContenctUi from "@/app/dashboard/components/no-content";

export default async function Lendings() {
  const cookiesList = cookies();
  const accessToken = cookiesList.get("accessToken");
  const response = await fetch(`${process.env.API_URL}/users/lendings`, {
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

  const debts: Debt[] = result.data;

  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Lendings</CardTitle>
        <CardDescription>Recent lendings from creditors.</CardDescription>
      </CardHeader>
      <CardContent>
        {debts && debts.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Debitor Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden md:table-cell">
                  Repayment Type
                </TableHead>
                <TableHead className="hidden md:table-cell">Due Date</TableHead>
                <TableHead className="text-right sm:table-cell"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {debts?.map((debt, key) => (
                <TableRow key={key.toString()}>
                  <TableCell>
                    <div className="font-medium">{debt.debitorName}</div>
                    {debt.creditorType === UserCreditorEnum.CREDITOR && (
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {"Custom Creditor"}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{`${debt.amount} $`}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="outline">
                      {debt.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(debt.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="font-medium">
                      {debt.repayment.isInstallments
                        ? "Installments"
                        : "One Time"}
                    </div>
                    {debt.repayment.isInstallments && (
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {debt.repayment.frequency}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(debt.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-align sm:table-cell">
                    <Link href={`/dashboard/debt/${debt._id}`}>
                      <ChevronRight />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          // <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm py-32">
          //   <div className="flex flex-col items-center gap-1 text-centr space-y-8">
          //     <h3 className="text-3xl font-bold tracking-tight">
          //       You have no lendings
          //     </h3>
          //     <CreateButton
          //       size="lg"
          //       type="Debt"
          //       route={"/dashboard/debt/create"}
          //     />
          //   </div>
          // </div>
          <NoContenctUi
            type="Debt"
            title=" You have no lendings"
            route={"/dashboard/debt/create"}
          />
        )}
      </CardContent>
    </Card>
  );
}
