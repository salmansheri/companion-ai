import { Home, LucideIcon, Plus, Settings } from "lucide-react";

export type RoutesType = {
  icon: LucideIcon;
  href: string;
  label: string;
  pro: boolean;
};

export const routes: RoutesType[] = [
  {
    icon: Home,
    href: "/",
    label: "Home",
    pro: false,
  },
  {
    icon: Plus,
    href: "/companion/new",
    label: "Create",
    pro: true,
  },
  {
    icon: Settings,
    href: "/settings",
    label: "Settings",
    pro: false,
  },
];
