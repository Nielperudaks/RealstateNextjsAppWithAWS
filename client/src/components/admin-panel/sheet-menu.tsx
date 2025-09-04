import Link from "next/link";
import { MenuIcon, PanelsTopLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Menu } from "@/components/admin-panel/menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useGetAuthUserQuery } from "@/state/api";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { useSidebar } from "@/hooks/use-sidebar";
import { Manager } from "@/types/prismaTypes";

export function SheetMenu() {
  const sidebar = useStore(useSidebar, (x) => x);
  const { data: authUser } = useGetAuthUserQuery();
  if (!sidebar) return null;
  if (!authUser?.userRole) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <Button
            className="flex justify-center items-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              <h1
                className={cn(
                  "font-bold text-xl whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300 -ml-2",
                  !getOpenState()
                    ? "-translate-x-96 opacity-0 hidden"
                    : "translate-x-0 opacity-100"
                )}
              >
                Rent<span className="text-primary font-light">ease</span>
              </h1>
            </Link>
          </Button>
        </SheetHeader>
        <Menu
          isOpen={getOpenState()}
          userType={authUser?.userRole.toLowerCase() as "manager" || "tenant"}
        />
      </SheetContent>
    </Sheet>
  );
}
