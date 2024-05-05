"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';
import { SIDENAV_ITEMS } from '@/constants';
import { SideNavItem } from '@/types';

// Assuming SIDENAV_ITEMS and SideNavItem are correctly defined in '@/types' and '@/constants'
interface MenuItemProps {
  item: SideNavItem; // Assuming this type is correctly defined in '@/types'
  isOpen: boolean;
  toggleSubMenu: () => void;
}

const SideNav = () => {
  const pathname = usePathname();
  const [openSubMenuId, setOpenSubMenuId] = useState<number | null>(null);

  // Determine which submenu should be open based on the current route
  useEffect(() => {
    const foundIndex = SIDENAV_ITEMS.findIndex(item =>
      item.subMenuItems?.some(subItem => subItem.path === pathname)
    );
    if (foundIndex !== -1) {
      setOpenSubMenuId(foundIndex);
    }
  }, [pathname]);

  const handleSubMenuToggle = (id: number) => {
    setOpenSubMenuId((prevOpenId) => (prevOpenId === id ? null : id));

  };

  return (
    <div className="md:w-[274px]  bg-sidebar h-screen flex-1 fixed overflow-hidden  hidden md:flex">
      <div className="flex flex-col space-y-6 w-[274px]">
        <div className='flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 w-full'>
        </div>
        <div >
          <Link href="/" className="flex flex-row space-x-3 items-center justify-center border-b border-zinc-200 md:justify-start md:px-6 h-12 w-full">
            <h2 className="text-buttonColor font-semibold tracking-tight text-xl">Sewing - Bazar</h2>
          </Link>
        </div>
        <div className="flex flex-col space-y-2">
          {SIDENAV_ITEMS.map((item, idx) => (
            <MenuItem
              key={idx}
              item={item}
              isOpen={openSubMenuId === idx}
              toggleSubMenu={() => handleSubMenuToggle(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


const MenuItem: React.FC<MenuItemProps> = ({ item, isOpen, toggleSubMenu }) => {
  const pathname = usePathname();
  const isActive = item.path === pathname || item.subMenuItems?.some(subItem => subItem.path === pathname);

  // Adjusted to handle clicks on items without submenus
  const handleItemClick = () => {
    // If the item has a submenu and it is not already open, toggle the submenu.
    if (item.subMenuItems?.length) {
      toggleSubMenu();
    } else {
      // Logic for items without submenus remains the same
      toggleSubMenu();
    }
  };

  // Add a new handler for submenu item clicks to stop propagation
  const handleSubMenuItemClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    // Add any additional logic here if needed for submenu items
  };

  return (
    <div onClick={handleItemClick}>
      {item.subMenuItems?.length ? (
        <>
          <div className={`flex flex-row items-center cursor-pointer  rounded-lg  w-[240px] px-4 ml-4 justify-between ${isActive ? 'text-secondary bg-primary py-1 rounded-xl' : ''}`}>
            <div className="flex flex-row space-x-4 py-2 items-center">
              {item.icon && typeof item.icon === 'string' ? <Icon icon={item.icon} width="20" height="20" /> : item.icon}
              <span className={`cursor-pointer ${isActive ? 'text-secondary' : 'text-gray-800'}`}>{item.title}</span>
            </div>
            <Icon icon="lucide:chevron-right" className={`${isOpen ? 'rotate-90' : ''}`} width="17" height="17" />
          </div>
          {isOpen && (
            <div className="my-2 flex flex-col space-y-2 ml-16" onClick={handleSubMenuItemClick}>
              {item.subMenuItems.map((subItem, idx) => (
                <Link key={idx} href={subItem.path} className='flex gap-2'>
                  <span>-</span>
                  <p className={`block hover:text-secondary ${subItem.path === pathname ? 'text-secondary' : ''}`}>{subItem.title}</p>
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <Link href={item.path || '#'}>
          <div className={`flex flex-row items-center cursor-pointer rounded-lg  w-[240px] px-4 ml-4 ${isActive ? 'text-secondary bg-primary py-1 rounded-xl' : 'text-gray-800 hover:bg-gray-100'}`}>
            {item.icon && typeof item.icon === 'string' ? <Icon icon={item.icon} width="20" height="20" /> : item.icon}
            <span className="ml-4">{item.title}</span>
          </div>
        </Link>
      )}
    </div>
  );
};





export default SideNav;