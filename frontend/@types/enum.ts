

export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export type UserDetails= {
  id: string;
  Name: string;
  email: string;
  roles: string[];
}

export interface Course {
    id: number;
    title: string;
    description: string;
    duration: number;
    lessons :string;
}

