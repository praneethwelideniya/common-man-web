"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Menu } from "lucide-react";

const menuList = ["Profile", "Billing", "Team", "Subscription"];

const Nav = () => {
  const [showToggle, setShowToggle] = useState(false);
  return (
    <nav className="w-full pt-3 flex justify-between items-center border-b-2  xl:px-20 md:px-10 px-3 bg-white">
      <Link href="/" className="flex gap-2 justify-center items-center">
        <p className="font-satoshi font-semibold text-2xl text-black tracking-wide">
          WOhub
        </p>
      </Link>
      {/* Desktop Navigation */}
      <div className="hidden sm:flex gap-6">
        <NavigationMenu>
          <NavigationMenuList>
            {menuList.map((menu: string, key: number) => (
              <NavigationMenuItem
                className=" bg-transparent"
                key={key.toString()}
              >
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    {menu}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="sm:hidden flex ">
        <DropdownMenu>
          <DropdownMenuTrigger className="sm:hidden">
            <Menu
              color="black"
              size={35}
              onClick={() => {
                setShowToggle((prevState) => !prevState);
              }}
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="sm:hidden mr-2 min-w-[150px] ">
            {menuList.map((menu: string, key: number) => (
              <DropdownMenuItem key={key.toString()}>{menu}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Nav;
