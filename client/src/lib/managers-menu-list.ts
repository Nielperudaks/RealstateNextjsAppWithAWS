import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  Building,
  File
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

export function getManagerMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "/managers/properties",
          label: "Properties",
          icon: Building,
          submenus: []
        },
        {
          href: "/managers/applications",
          label: "Applications",
          icon: File,
          submenus: []
        }
      ]
    },
    
   
    
    
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/managers/Settings",
          label: "Settings",
          icon: Users
        }
        
      ]
    }
  ];
}
