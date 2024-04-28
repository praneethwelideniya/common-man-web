import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserType } from "@/types/UserRespose";
import clsx from "clsx";
import { use, useState } from "react";

type UserListProps = {
  users: Array<UserType>;
  onChange: (_id: string) => void;
  value: string;
  createNewUser: () => void;
};

export function UserList({
  users,
  onChange,
  value,
  createNewUser,
}: UserListProps) {
  return (
    <div className="grid gap-2 ">
      <ScrollArea className="h-max-2 w-full rounded-md border ">
        <div className="space-y-2 py-2">
          {users.length < 1 && (
            <div className="flex items-center justify-center space-x-2">
              <Label className=" text-red-800">No user Found</Label>
            </div>
          )}
          {users?.map((user) => (
            <div
              className={clsx("flex items-center p-2 rounded-md mx-4 ", {
                "bg-primary-foreground border-2 border-black":
                  value === user._id,
                "hover:bg-primary-background": value !== user._id,
              })}
              onClick={() => onChange(user._id)}
              key={user._id}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className=" bg-gray-300">
                  {user.fullName.trim().charAt(0).toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.fullName}
                </p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
