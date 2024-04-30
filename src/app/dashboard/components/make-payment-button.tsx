"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/custom-radio-group";
import { Installment } from "@/types/Debt";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef, useState } from "react";
import { repayDebt } from "@/actions/debt";
import Loader from "@/components/Loader";

enum AmountEnum {
  NEXTPAYMENT = "NEXTPAYMENT",
  TOTALDUE = "TOTALDUE",
  CUSTOM = "CUSTOM",
}

export function MakePaymentButton({
  nextInstallment,
  remainingAmount,
  isInstallments,
  dueDate,
  currency,
  _id,
  isCreditort,
}: {
  nextInstallment: Installment;
  remainingAmount: number;
  isInstallments: boolean;
  dueDate: Date;
  currency: string;
  _id: string;
  isCreditort: boolean;
}) {
  const [payAmount, setPayAmount] = useState(
    parseFloat(nextInstallment.amount)
  );
  const [showCustom, setShowCustom] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setShowCustom(false);
  }, []);

  const radioButtonref = useRef(null);

  const noIstallments = remainingAmount === parseFloat(nextInstallment.amount);
  return (
    <Dialog
      onOpenChange={() => {
        setShowCustom(false);
        setPayAmount(parseFloat(nextInstallment.amount));
      }}
      open={showDialog}
    >
      {/* <DialogTrigger asChild>
      </DialogTrigger> */}
      <Button
        onClick={() => {
          setShowCustom(false);
          setPayAmount(parseFloat(nextInstallment.amount));
          setShowDialog(true);
        }}
      >
        Make a Payment
      </Button>

      <DialogContent className=" max-w-[80%] sm:max-w-[460px] ">
        <DialogHeader>
          <DialogTitle className="mx-auto mb-2">Make a Payment</DialogTitle>
          <DialogDescription>{`Select an amount to pay (${currency})`}</DialogDescription>
        </DialogHeader>
        <Card>
          <CardContent className="grid gap-4 py-4 mx-auto">
            {loading && <Loader />}
            <RadioGroup
              defaultValue={
                noIstallments ? AmountEnum.TOTALDUE : AmountEnum.NEXTPAYMENT
              }
              ref={radioButtonref}
              onValueChange={(value) => {
                switch (value) {
                  case AmountEnum.NEXTPAYMENT:
                    setPayAmount(parseFloat(nextInstallment.amount));
                    setShowCustom(false);
                    break;
                  case AmountEnum.TOTALDUE:
                    setPayAmount(remainingAmount);
                    setShowCustom(false);
                    break;
                  case AmountEnum.CUSTOM:
                    setShowCustom(true);
                    setPayAmount(0);
                    break;
                }
              }}
            >
              {!noIstallments && (
                <>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={AmountEnum.NEXTPAYMENT}
                      id="r1"
                      className="my-4"
                    />
                    <div className=" flex justify-between w-full">
                      <div className="flex flex-col items-start space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {`Next Payment`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(
                            nextInstallment.dueDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <Label>
                        {parseFloat(nextInstallment.amount).toFixed(2)}
                      </Label>
                    </div>
                  </div>

                  <Separator className="my-1" />
                </>
              )}
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value={AmountEnum.TOTALDUE}
                  id="r2"
                  className="my-4"
                />
                <div className=" flex justify-between w-full">
                  <div className="flex flex-col items-start space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {`Total due amount`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Label htmlFor="r3">{remainingAmount.toFixed(2)}</Label>
                </div>
              </div>
              <Separator className="my-1" />
              <div className="flex flex-col ">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={AmountEnum.CUSTOM} id="r3" />

                  <p className="text-sm font-medium leading-none">{`Custom`}</p>
                </div>
                {showCustom && (
                  <Input
                    className={`w-[60%] mt-3 ml-20 h-15 text-2xl ${
                      payAmount > remainingAmount
                        ? "focus:border-rose-500  focus-visible:ring-0 focus-visible:ring-offset-0"
                        : null
                    }`}
                    onChange={(e) => {
                      setPayAmount(parseFloat(e.target.value));
                    }}
                    value={payAmount}
                    type="number"
                  />
                )}
              </div>
              <Separator className="mt-4" />
            </RadioGroup>
          </CardContent>
        </Card>
        {/* <div className="grid gap-4 py-4 mx-auto">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div> */}
        <DialogFooter className="w-full flex flex-col">
          <Button
            onClick={async (e) => {
              e.preventDefault();
              setShowDialog(false);
            }}
            className="w-full py-6"
            variant={"outline"}
          >
            Close
          </Button>
          <Button
            onClick={async (e) => {
              e.preventDefault();
              setLoading(true);
              await repayDebt({ _id, payAmount });
              setLoading(false);
              setShowDialog(false);
            }}
            className="w-full py-6"
            disabled={!payAmount || payAmount > remainingAmount}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
