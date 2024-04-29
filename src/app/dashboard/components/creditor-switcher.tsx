"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { UserCreditorType } from "@/app/dashboard/components/debt-create-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const creditorsGroupsSam = [
  {
    label: "Creditors",
    values: [
      {
        label: "After Pay",
        value: "2434sdsaf2334",
      },
    ],
  },
  {
    label: "Users",
    values: [
      {
        label: "Praneeth Welideniya",
        value: "dafd43124nsad",
      },
      {
        label: "Jamintha Welideniya",
        value: "dsda324afa324f",
      },
    ],
  },
];

type Creditor = {
  type: string;
  name: string;
  _id: string;
};

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface CreditorSwitcherProps extends PopoverTriggerProps {
  creditors: Array<Creditor>;
  onValueChange: (value: UserCreditorType) => void;
  creditorValue: UserCreditorType;
  placeHolder: string;
}

export default function CreditorSwitcher({
  className,
  creditorValue,
  onValueChange,
  creditors,
  placeHolder,
}: CreditorSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);

  const initialValue: Array<{ label: string; values: Array<Creditor> }> = [];

  const groups = creditors.reduce((acc, creditor) => {
    const type = creditor.type;
    acc.find((group) => group.label === type)?.values.push(creditor) ||
      acc.push({ label: type, values: [creditor] });
    return acc;
  }, initialValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className={cn("w-[200px] justify-between", className)}
        >
          {creditorValue && (
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/${creditorValue.name}.png`}
                alt={creditorValue.name}
                className="grayscale"
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          )}

          {creditorValue?.name || placeHolder}
          <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search team..." />
            <CommandEmpty>No user found.</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.values.map((creditor) => (
                  <CommandItem
                    key={creditor.name}
                    onSelect={() => {
                      onValueChange(creditor as UserCreditorType);
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${creditor._id}.png`}
                        alt={creditor.name}
                        className="grayscale"
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    {creditor.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        creditorValue?._id === creditor._id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
          <CommandSeparator />
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// Dialog is removed temporarily. will use later

{
  /* <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      aria-label="Select a team"
      className={cn("w-[200px] justify-between", className)}
    >
      {selectedCreditor && (
        <Avatar className="mr-2 h-5 w-5">
          <AvatarImage
            src={`https://avatar.vercel.sh/${selectedCreditor.name}.png`}
            alt={creditors.find((c) => c._id === value)?.name}
            className="grayscale"
          />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      )}

      {selectedCreditor?.name || "Select a creditor"}
      <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-[200px] p-0">
    <Command>
      <CommandList>
        <CommandInput placeholder="Search team..." />
        <CommandEmpty>No creditor found.</CommandEmpty>
        {groups.map((group) => (
          <CommandGroup key={group.label} heading={group.label}>
            {group.values.map((creditor) => (
              <CommandItem
                key={creditor.name}
                onSelect={() => {
                  onValueChange(creditor._id);
                  setOpen(true);
                }}
                className="text-sm"
              >
                <Avatar className="mr-2 h-5 w-5">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${creditor._id}.png`}
                    alt={creditor.name}
                    className="grayscale"
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                {creditor.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedCreditor?._id === creditor._id
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
      <CommandSeparator />
      <CommandList>
        <CommandGroup>
          <DialogTrigger asChild>
            <CommandItem
              onSelect={() => {
                setOpen(false);
                setShowNewTeamDialog(true);
              }}
            >
              <PlusCircledIcon className="mr-2 h-5 w-5" />
              Create Creditor
            </CommandItem>
          </DialogTrigger>
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>
<DialogContent className={"overflow-y-scroll max-h-[90vh]"}>
  <DialogHeader>
    <DialogTitle>Create Creditor</DialogTitle>
    <DialogDescription>
      Add a new creditor to create a debt.
    </DialogDescription>
  </DialogHeader>
  <CreditorAddForm />
</DialogContent>
</Dialog> */
}
