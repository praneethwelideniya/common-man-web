import { UserOwesResponse } from "@/types/UserOwesResponse";
import { ArrowUpRight, PlusCircle } from "lucide-react";
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

function UsersOwes({
  userOwes,
  actionButton = "CREATE",
}: {
  userOwes: UserOwesResponse[];
  actionButton: "VIEWALL" | "CREATE";
}) {
  return (
    <Card x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Users</CardTitle>
          <CardDescription>Total owes with each users.($)</CardDescription>
        </div>
        {actionButton === "VIEWALL" && (
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/dashboard/debt/users">
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
        {actionButton === "CREATE" && (
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/dashboard/debt/users/create">
              Create
              <PlusCircle className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>You Owe</TableHead>
              <TableHead>Owes you</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userOwes
              //   .filter(({ oweFrom, oweTo }) => oweFrom > 0 || oweTo > 0)
              .map((user, index) => (
                <TableRow key={index.toString()}>
                  <TableCell>
                    <div className="font-medium">{user.fullName}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell>{user.oweTo.toFixed(2)}</TableCell>
                  <TableCell>{user.oweFrom.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    {(user.oweFrom - user.oweTo).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default UsersOwes;
