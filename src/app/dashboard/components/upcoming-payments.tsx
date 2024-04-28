import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
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
import { UpcomingPaymentsType } from "@/types/UserOwesResponse";

function UpcomingPayments({
  upcomingPayments,
  showViewAll,
}: {
  upcomingPayments: UpcomingPaymentsType[];
  showViewAll?: boolean;
}) {
  return (
    <Card x-chunk="dashboard-01-chunk-5">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Upcoming Payments ($)</CardTitle>
          <CardDescription></CardDescription>
        </div>
        {showViewAll && (
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/dashboard/debt/upcomingpayments">
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>

              <TableHead>Amount</TableHead>
              <TableHead className="hiddle sm:table-cell">Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {upcomingPayments.map((payment, index) => (
              <TableRow
                className={`${
                  payment.type == "PAYMENT" ? "bg-red-100" : "bg-green-100"
                }`}
                key={index.toString()}
              >
                <TableCell>
                  <div className="font-medium">{payment.name}</div>
                </TableCell>
                <TableCell>
                  {payment.type == "PAYMENT" ? "Payment" : "Receivable"}
                </TableCell>
                <TableCell>
                  {new Date(payment.dueDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{payment.amount.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/dashboard/debt/${payment.debtId}`}>
                    <ChevronRight />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default UpcomingPayments;
