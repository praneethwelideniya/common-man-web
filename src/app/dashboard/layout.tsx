import DashboardHeader from "@/app/dashboard/components/dashboard-header";
import DashboardMenuBar from "@/app/dashboard/components/dashboard-menubar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] 2xl:px-[5%]  bg-muted/40">
      <DashboardMenuBar />

      <div className="flex flex-col bg-muted/40">
        <ScrollArea className="w-full h-screen">
          <>
            <DashboardHeader />

            <main className="flex-1 flex-col gap-4 p-2 lg:gap-6 lg:px-8 h-full xl:px-24 ">
              {children}
            </main>
          </>
        </ScrollArea>
      </div>
    </div>
  );
}
