"use client";

import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      const userRole = authUser.userRole?.toLowerCase();
      if (
        (userRole === "manager" && pathname.startsWith("/tenants")) ||
        (userRole === "tenant" && pathname.startsWith("/managers"))
      ) {
        router.push(
          userRole === "manager"
            ? "/managers/properties"
            : "/tenants/favorites",
          { scroll: false }
        );
      }
      setIsLoading(false);
    } else if (!authLoading) {
      setIsLoading(false);
    }
  }, [authUser, authLoading, router, pathname]);

  if (authLoading || isLoading) {
    return <div>Loading...</div>;
  }

  if (!authUser?.userRole) return null;

  return (
    <AdminPanelLayout>
      <ContentLayout title="Dashboard">{children}</ContentLayout>
    </AdminPanelLayout>
  );
}
