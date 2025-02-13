import AppSidebar from "@/components/app/app-sidebar";
import Header from "@/components/app/header";
import QCProvider from "@/components/app/q-c-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <QCProvider>
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main>{children}</main>
          <Toaster />
        </div>
      </QCProvider>
    </SidebarProvider>
  );
};

export default Layout;
