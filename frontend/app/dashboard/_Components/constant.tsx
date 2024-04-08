import { Icon } from "@iconify/react";

import { SideNavItem } from "@/@types/enum";

const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "lessons",
    path: "/lessons",
    icon: <Icon icon="lucide:book" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add Lesson", path: "/lessons/add" },
      { title: "View Lesson", path: "/lessons/view" },
    ],
  },
  {
    title: "Logout",
    path: "",
    icon: <Icon icon="lucide:log-out" width="24" height="24" />,
  },
];
export default SIDENAV_ITEMS;
