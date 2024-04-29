"use client";

import { addCreditors } from "@/actions/users";
import UserSearchBar from "@/app/dashboard/components/user-search-bar";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  AddUserCreditorRequest,
  AddUserCreditorScheme,
  UserCreditorEnum,
} from "@/types/UserRequest";

function AddDebtUser() {
  const form = useForm<AddUserCreditorRequest>({
    resolver: zodResolver(AddUserCreditorScheme),
  });

  const [confirmOpen, setConfirmOpen] = useState(false);

  const checkError = () => {
    // setConfirmOpen(true);
    console.log(form.formState.isValid);
    if (!form.formState.isValid) {
      form.handleSubmit(() => {})();
    } else {
      setConfirmOpen(true);
    }
  };

  const onSubmit = (formData: AddUserCreditorRequest) => {
    addCreditors(formData);
  };
  return (
    <Form {...form} key={"addCreditorFrom"}>
      {form.formState.isSubmitting && <Loader />}
      <AlertDialog open={confirmOpen}>
        <form>
          <Card className="mx-auto  max-w-full 2xl:mx-12 2xl:px-6">
            <CardHeader>
              <CardTitle>Create User</CardTitle>
              <CardDescription>(*) feilds are requred</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1 md:gap-2 lg:gap-4 2xl:gap-8">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Chose the type of Creditor/Debitor *
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            defaultValue="comfortable"
                            className="p-2"
                            onValueChange={(value: string) => {
                              field.onChange(value);
                              form.resetField("value");
                            }}
                            value={field.value}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value={UserCreditorEnum.CREDITOR}
                                id="r1"
                              />
                              <Label htmlFor="r1">Custom Creditor</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value={UserCreditorEnum.USERREF}
                                id="r2"
                              />
                              <Label htmlFor="r2">Add Existing User</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value={UserCreditorEnum.USER}
                                id="r2"
                              />
                              <Label htmlFor="r2">
                                Create New User and Add
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {form.watch("type") === UserCreditorEnum.USERREF && (
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Search and Select User *</FormLabel>
                        <FormControl>
                          <UserSearchBar
                            onChange={(_id: string) => {
                              form.setValue("type", UserCreditorEnum.USERREF);
                              field.onChange(_id);
                            }}
                            value={field.value as unknown as string}
                            createNewUser={() => {}}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {form.watch("type") === UserCreditorEnum.USER && (
                  <div className="grid gap-2">
                    <div>
                      <FormField
                        control={form.control}
                        name="value.fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Jhon Wick" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className=" grid grid-cols-2 gap-2 lg:gap-4">
                      <div className="col-span-2 lg:col-span-1">
                        <FormField
                          control={form.control}
                          name="value.email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="example@email.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-2 lg:col-span-1">
                        <FormField
                          control={form.control}
                          name="value.phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number *</FormLabel>
                              <FormControl>
                                <Input placeholder="0450000000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {form.watch("type") === UserCreditorEnum.CREDITOR && (
                  <div className="grid gap-2">
                    <div className="grid grid-cols-2 gap-2 lg:gap-6">
                      <div className="col-span-2 lg:col-span-1 ">
                        <FormField
                          control={form.control}
                          name="value.name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Creditor Name *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="After Pay or Step Pay"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-2 lg:col-span-1">
                        <FormField
                          control={form.control}
                          name="value.description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Add a note *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="This is a creditor"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {form.watch("type") !== undefined && (
                  <div className="grid gap-2">
                    <div className=" grid-cols-4">
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          checkError();
                        }}
                        size={"lg"}
                        className=" float-right"
                      >
                        Create User
                      </Button>
                    </div>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Please Confirm to create or add user
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action will add the user to your debitor/creditor
                          list
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
                        <AlertDialogAction
                          type="submit"
                          onClick={() => {
                            setConfirmOpen(false);
                            form.handleSubmit(onSubmit)();
                          }}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </form>
      </AlertDialog>
    </Form>
  );
}

export default AddDebtUser;
