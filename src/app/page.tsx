"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <LoaderCircle className="animate-spin" size={64} />
    </div>
  );
};

export default Page;
