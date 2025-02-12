"use client";

import Link from "next/link";
import { LayoutDashboard, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";

const AppSidebar = () => {
  const pathname = usePathname();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      // Handle file upload
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                  <Link href="/dashboard">
                    <LayoutDashboard />
                    <p>Dashboard</p>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button
              variant="outline"
              className="w-full rounded-full space-x-4"
              onClick={() => fileInputRef.current?.click()}
            >
              <p>Upload CSV data</p>
              <Plus className="w-6 h-6" />
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <input
        type="file"
        accept="text/csv"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </Sidebar>
  );
};

export default AppSidebar;
