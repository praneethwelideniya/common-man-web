"use client";
import {
  Bell,
  DollarSign,
  DollarSignIcon,
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import { logout } from "@/actions/auth";

function DashboardMenuBar() {
  const pathname = usePathname();

  const hasWordInPathname = (word: string) => pathname.includes(word);

  return (
    <div className="hidden border-r md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">CMNM</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav>
            <Accordion
              type="single"
              collapsible
              className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-2"
            >
              <Link
                href="/dashboard"
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
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
                  "flex items-center gap-3 rounded-lg px-3 py-2 my-1 text-muted-foreground transition-all hover:text-primary",
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
                  "flex items-center gap-3 rounded-lg px-3 py-2 my-1 text-muted-foreground transition-all hover:text-primary",
                  {
                    "text-primary bg-muted":
                      pathname === "/dashboard/debt/users",
                  }
                )}
              >
                <Users className="h-4 w-4" />
                Users/Company
              </Link>
              <Link
                href="/dashboard/debt/upcomingpayments"
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2 my-1 text-muted-foreground transition-all hover:text-primary",
                  {
                    "text-primary bg-muted":
                      pathname === "/dashboard/debt/upcomingpayments",
                  }
                )}
              >
                <DollarSignIcon className="h-4 w-4" />
                Upcoming Payments
              </Link>
              {/* <AccordionItem value="item-1" className=" border-b-0">
                <div
                  className={clsx(
                    "flex items-center gap-3 rounded-lg px-3 py-0 text-muted-foreground transition-all hover:text-primary",
                    {
                      "text-primary bg-muted":
                        hasWordInPathname("dashboard/debt"),
                    }
                  )}
                >
                  <Users className="h-4 w-4" />
                  <div className="flex-1 ps-3">
                    <AccordionTrigger className="hover:no-underline py-2">
                      Debt
                    </AccordionTrigger>
                  </div>
                </div>
                <AccordionContent className="p-0 pl-2 mt-0">
                  <>
                    <Link
                      href="/dashboard/debt"
                      className={clsx(
                        "flex items-center gap-3 rounded-lg px-3 py-2 my-1 text-muted-foreground transition-all hover:text-primary",
                        {
                          "text-primary bg-muted":
                            pathname === "/dashboard/debt",
                        }
                      )}
                    >
                      <LineChart className="h-4 w-4" />
                      All Debts
                    </Link>
                    <Link
                      href="/dashboard/debt/users"
                      className={clsx(
                        "flex items-center gap-3 rounded-lg px-3 py-2 my-1 text-muted-foreground transition-all hover:text-primary",
                        {
                          "text-primary bg-muted":
                            pathname === "/dashboard/debt/users",
                        }
                      )}
                    >
                      <Users className="h-4 w-4" />
                      Users/Company
                    </Link>
                  </>
                </AccordionContent>
              </AccordionItem> */}
            </Accordion>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card>
            <CardHeader className="p-2 pt-0 md:p-4"></CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full" onClick={() => logout()}>
                LogOut
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardMenuBar;
