"use client";

import Link from "next/link";
import { LayoutDashboard, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

import FilePreviewer from "./dialogs/file-previewer";
import useAnalysisResult from "@/hooks/use-analysis-result";
import { Button } from "../ui/button";
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

const AppSidebar = () => {
  const pathname = usePathname();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFilePreviewerOpen, setIsFilePreviewerOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const { analysisResultsQuery } = useAnalysisResult();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileUrl = URL.createObjectURL(file);

      setSelectedFile(file);
      setFileUrl(fileUrl);
      setIsFilePreviewerOpen(true);

      // Reset the input value to allow uploading the same file again
      event.target.value = "";
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
              disabled={analysisResultsQuery.isLoading}
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
      <FilePreviewer
        open={isFilePreviewerOpen}
        selectedFile={selectedFile}
        fileUrl={fileUrl}
        onOpenChange={setIsFilePreviewerOpen}
        setFile={setSelectedFile}
        setFileUrl={setFileUrl}
      />
    </Sidebar>
  );
};

export default AppSidebar;
