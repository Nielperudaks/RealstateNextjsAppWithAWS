"use client";

import Link from "next/link";
import { LayoutGrid, LogOut, User, Settings, Bell, MessageCircle, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth";
import { useGetAuthUserQuery } from "@/state/api";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function UserNav() {
  const { data: authUser } = useGetAuthUserQuery();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  if (!authUser) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </Link>
        <Link href="/signup">
          <Button size="sm">Get Started</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {/* Action Button */}
      <Button
        variant="default"
        size="sm"
        className="flex items-center gap-2"
        onClick={() =>
          router.push(
            authUser.userRole?.toLowerCase() === "manager"
              ? "/managers/newproperty"
              : "/search"
          )
        }
      >
        {authUser.userRole?.toLowerCase() === "manager" ? (
          <>
            <Plus className="h-4 w-4" />
            <span className="hidden md:block">Add Property</span>
          </>
        ) : (
          <>
            <Search className="h-4 w-4" />
            <span className="hidden md:block">Search</span>
          </>
        )}
      </Button>

      {/* Notifications */}
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="relative h-8 w-8 p-0">
                <MessageCircle className="h-4 w-4" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Messages</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="relative h-8 w-8 p-0">
                <Bell className="h-4 w-4" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* User Dropdown */}
      <DropdownMenu>
        <TooltipProvider disableHoverableContent>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={authUser.userInfo?.image} alt="Avatar" />
                    <AvatarFallback className="bg-transparent">
                      {authUser.userRole?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">Profile</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {authUser.userInfo?.name || "User"}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {authUser.userInfo?.email || ""}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem 
              className="hover:cursor-pointer" 
              onClick={() =>
                router.push(
                  authUser.userRole?.toLowerCase() === "manager"
                    ? "/managers/properties"
                    : "/tenants/favorites"
                )
              }
            >
              <LayoutGrid className="w-4 h-4 mr-3 text-muted-foreground" />
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:cursor-pointer"
              onClick={() =>
                router.push(
                  `/${authUser.userRole?.toLowerCase()}s/settings`
                )
              }
            >
              <Settings className="w-4 h-4 mr-3 text-muted-foreground" />
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="hover:cursor-pointer" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
