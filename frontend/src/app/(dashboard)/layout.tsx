import { PropsWithChildren } from "react";
import { DashboardLayout } from "@/src/components/layout/dashboard-layout/DashboardLayout";

export default function Layout({children}: PropsWithChildren<unknown>) {
  return <DashboardLayout>{children}</DashboardLayout>
}