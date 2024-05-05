export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};


export interface Club {
  ClubID?: number;
  Name: string;
  Location: string;
  FoundationYear: string;
  PresidentName: string;
}

