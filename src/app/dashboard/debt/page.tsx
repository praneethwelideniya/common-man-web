import CreateButton from "@/app/dashboard/components/create-button";
import Borrowings from "@/app/dashboard/debt/borrowings/page";
import Lendings from "@/app/dashboard/debt/lendings/page";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListFilter } from "lucide-react";

export default function DebtPage() {
  return (
    <div className="grid gap-4">
      <Tabs defaultValue="lendings">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="lendings">Lendings</TabsTrigger>
            <TabsTrigger value="borrowings">Borrowings</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Sort By
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Newest first
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Oldest first
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Highest Amount
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Lowest Amount
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu> */}

            <CreateButton
              size="sm"
              type="Debt"
              route={"/dashboard/debt/create"}
            />
          </div>
        </div>
        <TabsContent value="lendings">
          <Lendings />
        </TabsContent>
        <TabsContent value="borrowings">
          <Borrowings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
