import { Debt, Installment } from "@/types/Debt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  Delete,
  File,
  ListFilter,
  MoreVertical,
  Pencil,
  Recycle,
  Trash,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MakePaymentButton } from "@/app/dashboard/components/make-payment-button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UserDebtResponse } from "@/types/UserDebtResponse";
import { UserCreditorEnum } from "@/app/dashboard/debt/users/create/page";
import { DeleteDebtButton } from "@/app/dashboard/components/delete-debt-button";

type PaidStatusType = "PAID" | "PARTIAL" | "PENDING";

interface InstallmentUiType {
  installmentNum: string;
  values: Array<Installment>;
  totalAmount: number;
  paidAmount: number;
  duedate: Date;
}

async function DebtPage({ params }: { params: { slug: string } }) {
  const cookiesList = cookies();
  const accessToken = cookiesList.get("accessToken");
  const response = await fetch(`${process.env.API_URL}/debts/${params.slug}`, {
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

  console.log({ result });
  const debt: UserDebtResponse = result.data;

  const {
    debtTitle,
    nextInstallment,
    remainingAmount,
    installmentGroup,
    _id,
    currency,
    creditor: {
      fullName: cFullName,
      phoneNumber: cPhoneNumber,
      email: cEmail,
      _id: c_id,
    },
    debitor: {
      fullName: dFullName,
      phoneNumber: dPhoneNumber,
      email: dEmail,
      _id: d_id,
    },
    date,
    isInstallments,
    frequency,
    dueDate,
    status,
    amount,
    isCreditor,
    paidAmount,
    creditorType,
    historyLog,
  } = debt;

  console.log(historyLog);

  return (
    <div className="flex flex-col gap-4 sm:gap-8 sm:py-4">
      <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
        <Card className="col-span-2" x-chunk="dashboard-05-chunk-0">
          <CardHeader className="pb-3">
            <CardDescription className="text-4md">{debtTitle}</CardDescription>
            <div className="flex flex-col sm:flex-row  items-start sm:items-center justify-between">
              <CardTitle className="text-lg lg:text-2xl 2xl:text-4xl py-2">{`${currency} ${amount}`}</CardTitle>
              {status === "PENDING" && (
                <MakePaymentButton
                  nextInstallment={nextInstallment as Installment}
                  remainingAmount={remainingAmount}
                  isInstallments={isInstallments}
                  dueDate={dueDate}
                  currency={currency}
                  isCreditort={isCreditor}
                  _id={_id}
                />
              )}
            </div>
          </CardHeader>
          <CardFooter>
            <Progress
              value={(100 * paidAmount) / amount}
              aria-label="oaid progress"
            />
          </CardFooter>
        </Card>

        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-3">
            <CardDescription className="text-md">Paid</CardDescription>
            <CardTitle className=" text-lg lg:text-2xl 2xl:text-4xl">{`${currency} ${paidAmount.toFixed(
              2
            )}`}</CardTitle>
          </CardHeader>
          <CardFooter>
            <div className="text-xs md:text-2xstext-muted-foreground">
              {`${((100 * paidAmount) / amount).toFixed(2)}% of total debt`}
            </div>
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-2">
          <CardHeader className="pb-3">
            <CardDescription className="text-md">Remaining</CardDescription>
            <CardTitle className=" text-lg lg:text-2xl 2xl:text-4xl">{`${currency} ${remainingAmount.toFixed(
              2
            )}`}</CardTitle>
          </CardHeader>
          <CardFooter>
            <div className="text-xs md:text-2xs text-muted-foreground">
              {/* 90% of total debt */}
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className=" flex-1 items-start gap-4 sm:py-0 md:gap-8 xl:grid-cols-2 grid">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1 ">
          <Card x-chunk="dashboard-05-chunk-3 ">
            <CardHeader className="flex flex-row items-start bg-muted/50 mb-6 py-8">
              <CardTitle>Schedule payments</CardTitle>
              {/* <CardDescription>Recent orders from your store.</CardDescription> */}
            </CardHeader>

            <CardContent className="grid gap-3">
              {/* <Separator className="my-4" /> */}
              {installmentGroup?.map((instlmnt, index) => {
                let paidStatus: PaidStatusType = "PARTIAL";
                if (instlmnt.paidAmount === 0) {
                  paidStatus = "PENDING";
                } else if (instlmnt.paidAmount >= instlmnt.totalAmount) {
                  paidStatus = "PAID";
                }
                return (
                  <>
                    {paidStatus === "PENDING" ? (
                      <>
                        <InstalmentUI
                          paidStatus={paidStatus}
                          instlmnt={instlmnt}
                          currency={currency}
                        />
                        <Separator className="my-4" />
                      </>
                    ) : (
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="hover:no-underline">
                            <InstalmentUI
                              paidStatus={paidStatus}
                              instlmnt={instlmnt}
                              currency={currency}
                            />
                          </AccordionTrigger>
                          <AccordionContent className="pl-10">
                            {instlmnt.values
                              .filter((val) => val.paid)
                              .map((ins) => (
                                <div className="flex items-center w-full font-medium">
                                  <p>{`Paid at ${new Date(
                                    ins.paidAt
                                  ).toLocaleDateString()}`}</p>
                                  <p className="ml-auto">
                                    {currency}{" "}
                                    {parseFloat(ins.amount).toFixed(2)}
                                  </p>
                                </div>
                              ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}
                  </>
                );
              })}
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <Card className="overflow-hidden " x-chunk="dashboard-05-chunk-4">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    {`Debt Details`}
                  </CardTitle>
                  <CardDescription>{`Date: ${new Date(
                    date
                  ).toLocaleDateString()}`}</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <DeleteDebtButton _id={_id} />
                  {/* <Button size="sm" variant="outline" className="h-8 gap-1">
                    <Pencil className="h-3.5 w-3.5" />
                  </Button> */}
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Debt Details</div>
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Currency</span>
                      <span>{currency}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Debt Amount</span>
                      <span>{amount}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Paid</span>
                      <span>{paidAmount.toFixed(2)}</span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Remaining</span>
                      <span>{(amount - paidAmount).toFixed(2)}</span>
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <ul className="grid gap-3">
                  <div className="font-semibold">Repayment Details</div>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Repayment type
                    </span>
                    <span>{isInstallments ? "Installments" : "One Time"}</span>
                  </li>
                  {isInstallments && (
                    <>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Frequency</span>
                        <span>{frequency}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          No Of Installments
                        </span>
                        <span>{installmentGroup?.length}</span>
                      </li>
                      {nextInstallment && (
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Next due date
                          </span>
                          <span>
                            {new Date(
                              nextInstallment?.dueDate as unknown as string
                            ).toLocaleDateString()}
                          </span>
                        </li>
                      )}
                    </>
                  )}
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Debt Due Date</span>
                    <span>{new Date(dueDate).toLocaleDateString()}</span>
                  </li>
                </ul>
                <Separator className="my-4" />
                {isCreditor ? (
                  <div className="grid gap-3">
                    <div className="font-semibold">Debitor Information</div>
                    <dl className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Name</dt>
                        <dd>{dFullName}</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Email</dt>
                        <dd>
                          <a href="mailto:">{dEmail}</a>
                        </dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Phone</dt>
                        <dd>
                          <a href="tel:">{dPhoneNumber}</a>
                        </dd>
                      </div>
                    </dl>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    <div className="font-semibold">Creditor Information</div>
                    <dl className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Name</dt>
                        <dd>{cFullName}</dd>
                      </div>
                      {creditorType === UserCreditorEnum.USER && (
                        <>
                          <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Email</dt>
                            <dd>
                              <a href="mailto:">{cEmail}</a>
                            </dd>
                          </div>
                          <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Phone</dt>
                            <dd>
                              <a href="tel:">{cPhoneNumber}</a>
                            </dd>
                          </div>
                        </>
                      )}
                    </dl>
                  </div>
                )}
                <Separator className="my-4" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="history">
            <Card className="overflow-hidden " x-chunk="dashboard-05-chunk-4">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    {`History`}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <Accordion
                  type="multiple"
                  className="w-full"
                  defaultValue={historyLog.map((log) => log.date)}
                >
                  <div className="grid gap-3">
                    {historyLog.map((log) => (
                      <AccordionItem value={log.date}>
                        <AccordionTrigger className="font-semibold hover:no-underline">
                          {log.date}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground gap-2">
                          {log.history.map((his, index) => (
                            <p className="my-1" key={index}>
                              {his}
                            </p>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </div>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default DebtPage;

const InstalmentUI = ({
  paidStatus,
  instlmnt,
  currency,
}: {
  paidStatus: PaidStatusType;
  instlmnt: InstallmentUiType;
  currency: string;
}) => {
  return (
    <div className="flex items-center gap-4 w-full">
      {paidStatus === "PAID" && (
        <CheckCircle className=" hidden sm:h-8 sm:w-8 lg:h-12 lg:w-12 sm:flex" />
      )}
      {paidStatus === "PARTIAL" && (
        <Avatar className="hidden  sm:h-8 sm:w-8 lg:h-12 lg:w-12 sm:flex border-dotted border-4 border-black">
          <AvatarFallback>{instlmnt.installmentNum}</AvatarFallback>
        </Avatar>
      )}
      {paidStatus === "PENDING" && (
        <Avatar className="hidden  sm:h-8 sm:w-8 lg:h-12 lg:w-12 sm:flex border-2 border-black">
          <AvatarFallback className=" font-semibold">
            {instlmnt.installmentNum}
          </AvatarFallback>
        </Avatar>
      )}
      <div className="flex flex-col items-start">
        <p className="text-sm lg:text-2sm xl:text-lg font-medium leading-none mb-2">
          {`Installment ${instlmnt.installmentNum}`}
        </p>
        <p className="text-sm lg:text-2sm text-muted-foreground">
          {new Date(instlmnt.duedate).toLocaleDateString()}
        </p>
      </div>

      <div
        className={`ml-auto ${
          paidStatus === "PENDING" ? "mr-4" : "mr-0"
        } text-2sm font-medium flex flex-col justify-between items-end`}
      >
        <p className="text-sm lg:text-2sm xl:text-lg font-medium leading-none mb-1">
          {currency}
          {paidStatus === "PAID"
            ? instlmnt.totalAmount.toFixed(2)
            : (instlmnt.totalAmount - instlmnt.paidAmount).toFixed(2)}
        </p>
        <p className="text-sm lg:text-2sm text-muted-foreground">
          {paidStatus === "PAID" ? "paid" : "pending"}
        </p>
      </div>
    </div>
  );
};
