import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  Building,
  File,
  Heart,
  Home
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getTenantMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Contents",
      menus: [
        {
           href: "/tenants/favorites",
          label: "Favorites",
          icon: Heart,
          submenus: []
        },
        {
          href: "/tenants/residences",
          label: "Residences",
          icon: Home,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/tenants/settings",
          label: "Settings",
          icon: Users
        }
        
      ]
    }
  ];
}
