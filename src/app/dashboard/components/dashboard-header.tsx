"use client";
import {
  DollarSignIcon,
  Home,
  LineChart,
  Menu,
  Package2,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/auth";

function DashboardHeader() {
  const pathname = usePathname();
  return (
    <header className="md:hidden flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">CMNM</span>
            </Link>

            <Link
              href="/dashboard"
              className={clsx(
                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                {
                  "text-primary bg-muted": pathname === "/dashboard",
                }
              )}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/debt"
              className={clsx(
                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                {
                  "text-primary bg-muted": pathname === "/dashboard/debt",
                }
              )}
            >
              <LineChart className="h-4 w-4" />
              All Debts
            </Link>
            <Link
              href="/dashboard/debt/users"
              className={clsx(
                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                {
                  "text-primary bg-muted": pathname === "/dashboard/debt/users",
                }
              )}
            >
              <Users className="h-4 w-4" />
              Users/Company
            </Link>
            <Link
              href="/dashboard/debt/upcomingpayments"
              className={clsx(
                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                {
                  "text-primary bg-muted":
                    pathname === "/dashboard/debt/upcomingpayments",
                }
              )}
            >
              <DollarSignIcon className="h-4 w-4" />
              Upcoming Payments
            </Link>
          </nav>
          <div className="mt-auto">
            <Card>
              <CardHeader></CardHeader>
              <CardContent>
                <Button size="sm" className="w-full" onClick={() => logout()}>
                  LogOut
                </Button>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
      {/* <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div> */}
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </header>
  );
}

export default DashboardHeader;
