import { Icon } from '@iconify/react';
import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: 'Inquires',
    path: '/Inquires/list',
    icon: <Icon icon="lucide:phone" width="24" height="24" />,
  },
];
