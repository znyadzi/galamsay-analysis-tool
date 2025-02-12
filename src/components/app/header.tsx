import Link from "next/link";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const Header = () => {
  return (
    <header className="flex items-center border-b ps-2 pe-4 py-2">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mx-2" />
      <Link href="/dashboard" className="text-lg font-semibold">
        Galamsey Analysis Tool
      </Link>
    </header>
  );
};

export default Header;
