"use client";

import CreditorSwitcher from "@/app/dashboard/components/creditor-switcher";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { createDebt } from "@/actions/debt";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { currencyArray } from "@/types/Common";
import { useState } from "react";

import Loader from "@/components/Loader";
import {
  DebtRequestType,
  UserCreditorType,
  debtSchema,
} from "@/types/DebtRequest";

export default function DebtCreateForm({
  creditors,
}: {
  creditors: UserCreditorType[];
}) {
  const form = useForm<DebtRequestType>({
    resolver: zodResolver(debtSchema),
    defaultValues: {
      debtType: "LEND",
      repaymentType: "LUMPSUM",
      debtDate: new Date(),
    },
  });
  const [confirmOpen, setConfirmOpen] = useState(false);

  const checkError = () => {
    // setConfirmOpen(true);

    if (!form.formState.isValid) {
      form.handleSubmit(() => {})();
    } else {
      setConfirmOpen(true);
    }
  };

  const onSubmit = async (formData: DebtRequestType) => {
    const res = await createDebt(formData);
  };

  return (
    <>
      {form.formState.isSubmitting && <Loader />}
      <Form {...form} key={"debtForm"}>
        <AlertDialog open={confirmOpen}>
          <form>
            <Card className="mx-auto  max-w-full">
              <CardHeader>
                <CardTitle>Create Debt</CardTitle>
                <CardDescription>(*) feilds are requred</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-1 md:gap-2 lg:gap-4 2xl:gap-8">
                  <div className="grid grid-cols-2 gap-4 lg:gap-8">
                    <div className="grid col-span-2 lg:col-span-1">
                      <FormField
                        control={form.control}
                        name="debtType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Debt type</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={(value: string) => {
                                  field.onChange(value);
                                  form.resetField("involvedBy");
                                }}
                                defaultValue={field.value}
                                value={field.value}
                              >
                                <SelectTrigger
                                  // className="w-full md:w-[75%] lg:w-[60%]"
                                  {...field}
                                >
                                  <SelectValue placeholder="Debt Type" />
                                </SelectTrigger>
                                <SelectContent {...field}>
                                  <SelectItem value={"BORROW"}>
                                    Borrowing
                                  </SelectItem>
                                  <SelectItem value={"LEND"}>
                                    Lending
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-2  col-span-2 lg:col-span-1">
                      <FormField
                        control={form.control}
                        name="involvedBy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{` Select ${
                              form.watch("debtType") === "BORROW"
                                ? "Creditor"
                                : "Debitor"
                            }`}</FormLabel>
                            <FormControl>
                              <CreditorSwitcher
                                onValueChange={field.onChange}
                                creditorValue={field.value}
                                creditors={
                                  form.watch("debtType") === "BORROW"
                                    ? creditors
                                    : creditors.filter((c) => c.type === "USER")
                                }
                                className="w-full px-2 py-1.5 border rounded-md flex"
                                placeHolder={
                                  form.watch("debtType") === "BORROW"
                                    ? "Select Creditor"
                                    : "Select Debitor"
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 lg:gap-8">
                    <div className="grid gap-2  col-span-2 sm:col-span-1">
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2  gap-2 lg:gap-4 col-span-2 2xl:col-span-1">
                      <div className="grid gap-2 col-span-2 sm:col-span-1">
                        <FormField
                          control={form.control}
                          name="currency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Currency</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <SelectTrigger
                                    // className="w-full md:w-[75%] lg:w-[60%]"
                                    {...field}
                                  >
                                    <SelectValue placeholder="Currency" />
                                  </SelectTrigger>
                                  <SelectContent {...field}>
                                    {currencyArray.map((currency) => (
                                      <SelectItem
                                        value={currency}
                                        key={currency}
                                      >
                                        {currency}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-2 col-span-2 sm:col-span-1">
                        <FormField
                          control={form.control}
                          name="debtDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Debt Date</FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  placeholder="Due Date"
                                  {...field}
                                  value={field?.value?.toString()} // Convert value to string
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 lg:gap-8">
                    <div className="grid gap-2  col-span-2 sm:col-span-1">
                      <FormField
                        control={form.control}
                        name="repaymentType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Repayment Type</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  form.resetField("repaymentFrequency");
                                  form.resetField("dueDate");
                                }}
                                value={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Repayment Type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem
                                    value="INSTALLMENTS"
                                    key={"installments"}
                                  >
                                    Installments
                                  </SelectItem>
                                  <SelectItem value="LUMPSUM" key={"lumpsum"}>
                                    One Time
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {form.watch("repaymentType") === "INSTALLMENTS" && (
                      <div className="grid grid-cols-2  gap-2 lg:gap-4 col-span-2 2xl:col-span-1">
                        <div className="grid gap-2 col-span-2 sm:col-span-1">
                          <FormField
                            control={form.control}
                            name="repaymentFrequency"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Frequency</FormLabel>
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <SelectTrigger {...field}>
                                      <SelectValue placeholder="Frequency" />
                                    </SelectTrigger>
                                    <SelectContent {...field}>
                                      <SelectItem value="DAILY">
                                        Daily
                                      </SelectItem>
                                      <SelectItem value="WEEKLY">
                                        Weekly
                                      </SelectItem>
                                      <SelectItem value="FORTNIGHTLY">
                                        Fortnightly
                                      </SelectItem>
                                      <SelectItem value="MONTHLY">
                                        Monthly
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid gap-2 col-span-2 sm:col-span-1">
                          <FormField
                            control={form.control}
                            name="numberOfInstallments"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>No. of installments</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    onChange={(value) => {
                                      field.onChange(
                                        parseInt(value.target.value)
                                      );
                                    }}
                                    value={field?.value?.toString()}
                                    type="number"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}
                    {form.watch("repaymentType") === "LUMPSUM" && (
                      <div className="grid gap-2 col-span-2 sm:col-span-1">
                        <FormField
                          control={form.control}
                          name="dueDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Due Date</FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  placeholder="Due Date"
                                  {...field}
                                  value={field?.value?.toString()} // Convert value to string
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        checkError();
                      }}
                      size={"lg"}
                      className=" float-right"
                    >
                      Create Debt
                    </Button>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Please Confirm to create debt
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          onClick={() => {
                            setConfirmOpen(false);
                          }}
                        >
                          Cancel
                        </AlertDialogCancel>
                        <Button
                          type="submit"
                          onClick={() => {
                            setConfirmOpen(false);
                            form.handleSubmit(onSubmit)();
                          }}
                        >
                          Continue
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </AlertDialog>
      </Form>
    </>
  );
}
