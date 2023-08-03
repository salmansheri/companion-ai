"use client";

import React from "react";
import { RoutesType, routes } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

export type sidebarNavType = typeof routes;

interface SidebarNavProps {
  route: RoutesType;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ route }) => {
  const pathname = usePathname();
  const router = useRouter();

  const onNavigate = (href: string) => {
    return router.push(href);
  };
  return (
    <div
      onClick={() => onNavigate(route.href)}
      className={cn(
        "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
        pathname === route.href ? "bg-primary/10 text-primary" : null,
      )}
    >
      <div className="flex flex-col gap-62 items-center flex-1">
        <route.icon className="h-5 w-5 " />
        {route.label}
      </div>
    </div>
  );
};

export default SidebarNav;
