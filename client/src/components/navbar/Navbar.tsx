"use client";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGetAuthUserQuery } from "@/state/api";

import { usePathname, useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth";
import { Bell, LayoutPanelLeft, LogOut, MessageCircle, Plus, Search, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SidebarTrigger } from "../ui/sidebar";

const Navbar04Page = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  //auth modifications
  const { data: authUser } = useGetAuthUserQuery();

  const router = useRouter();
  const pathname = usePathname();

  const isDashboardPage =
    pathname.includes("/managers") || pathname.includes("/tenants");
    
  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false);
      } else {
        // Scrolling up or at top
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full z-10 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-25"
      }`}
    >
      <div className="h-full flex items-center justify-between mx-auto px-6">
        {isDashboardPage &&(
          <div className="md:hidden">
            <SidebarTrigger className=""></SidebarTrigger>
          </div>
        )}
        <div className="flex items-center gap-3">
          <Logo />
          <h1 className="font-bold text-2xl text-primary">Rent<span className="font-light">ease</span></h1>
        </div>

        {/* Desktop Menu */}
        {isDashboardPage && authUser && (
          <Button
            variant="secondary"
            className="md:ml-4 bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground "
            onClick={() =>
              router.push(
                authUser.userRole?.toLowerCase() === "manager"
                  ? "managers/newproperty"
                  : "/search"
              )
            }
          >
            {authUser.userRole?.toLowerCase() === "manager" ? (
              <>
                <Plus className="h-4 w-4" />
                <span className="hidden md:block ml-2 ">Add New Property</span>
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                <span className="hidden md:block ml-2 ">Search Properties</span>
              </>
            )}
          </Button>
        )}

        {!isDashboardPage}

        <div className="flex items-center gap-4">
          {authUser ? (
            <>
              <div className="relative  md:block ">
                <MessageCircle className="w-6 h-6 cursor-point hover:text-primary" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-primary  rounded-full"></span>
              </div>
              <div className="relative  md:block ">
                <Bell className="w-6 h-6 cursor-point hover:text-primary " />
                <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
                  <Avatar>
                    <AvatarImage src={authUser.userInfo?.image} />
                    <AvatarFallback className="bg-muted">
                      {authUser.userRole?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="hidden md:block font-bold">{authUser.userInfo?.name}</p>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background text-foreground ">
                  <DropdownMenuItem
                    className=" cursor-pointer hover:!bg-secondary hover:text-primary font-bold"
                    onClick={() =>
                      router.push(
                        authUser.userRole?.toLowerCase() === "manager"
                          ? "/managers/properties"
                          : "/tenants/favorites",
                        { scroll: false }
                      )
                    }
                  >
                    <LayoutPanelLeft className="h-4 w-4 cursor-pointer hover:!bg-secondary hover:text-primary"/>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className=" cursor-pointer hover:!bg-secondary hover:text-primary"
                    onClick={() =>
                      router.push(
                        `/${authUser.userRole?.toLowerCase()}s/settings`,
                        { scroll: false }
                      )
                    }
                  >
                    <Settings className="h-4 w-4 cursor-pointer hover:!bg-secondary hover:text-primary"/>
                    Settings
                  </DropdownMenuItem>
                 
                  <DropdownMenuItem
                    className=" cursor-pointer hover:!bg-secondary hover:text-primary"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 cursor-pointer hover:!bg-secondary hover:text-primary"/>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button
                  variant="outline"
                  className="hidden sm:inline-flex rounded-full"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="rounded-full">Get Started</Button>
              </Link>
            </>
          )}

        
        </div>
      </div>
    </nav>
  );
};

export default Navbar04Page;
