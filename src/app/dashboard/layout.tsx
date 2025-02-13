import AppSidebar from "@/components/app/app-sidebar";
import Header from "@/components/app/header";
import QCProvider from "@/components/app/q-c-provider";
import { SidebarProvider } from "@/components/ui/sidebar";

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
        </div>
      </QCProvider>
    </SidebarProvider>
  );
};

export default Layout;
