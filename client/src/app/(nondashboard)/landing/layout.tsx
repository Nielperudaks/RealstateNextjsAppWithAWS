"use client";
import React, { useEffect, useState } from "react";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import Navbar from "@/components/navbar/Navbar";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/components/loading/Loading";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      const userRole = authUser.userRole?.toLowerCase();
      if (
        (userRole === "manager" && pathname.startsWith("/search")) ||
        (userRole === "manager" && pathname === "/")
      ) {
        router.push("/managers/properties", { scroll: false });
      }
      // else if (
      //   (userRole === "tenant" && pathname.startsWith("/properties")) ||
      //   (userRole === "tenant" && pathname === "/")
      // ) {
      //   router.push("/tenant/search", { scroll: false });
      // }
    } else {
      setIsLoading(false);
    }
  }, [authUser, router, pathname]);

  if (authLoading || isLoading) {
    return <Loading />;
  }

  if (!authUser?.userRole) return null;

  return (
    <div className="h-full w-full">
      <Navbar />
      <main
        className={`h-full flex w-full flex-col `}
        style={{ paddingTop: `${NAVBAR_HEIGHT}]px` }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
