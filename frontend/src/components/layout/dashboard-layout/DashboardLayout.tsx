import { PropsWithChildren } from "react";
import SidebarPage from "./sidebar/Sidebar";

export function DashboardLayout({children}: PropsWithChildren<unknown>) {
  return <SidebarPage>{children}</SidebarPage>
}