"use client";

import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <AdminPanelLayout>
      <ContentLayout title="Search your desired property with advanced filters">{children}</ContentLayout>
    </AdminPanelLayout>
  );
}
