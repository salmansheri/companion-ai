"use client";

import { routes } from "@/constants";
import { cn } from "@/lib/utils";
import React from "react";
import { usePathname } from "next/navigation";
import SidebarNav, { sidebarNavType } from "./sidebar-nav";
const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="space-y-4 flex flex-col h-full text-primary bg-secondary">
      <div className="p-3 flex-1 flex justify-center">
        <div className="space-y-2">
          {routes.map((route) => (
            <SidebarNav key={route.href} route={route} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
