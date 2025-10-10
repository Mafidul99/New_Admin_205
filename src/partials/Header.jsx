import React, { useEffect, useState } from 'react';

import SearchModal from '../components/ModalSearch';
import Notifications from '../components/DropdownNotifications';
import Help from '../components/DropdownHelp';
import UserMenu from '../components/DropdownProfile';
import ThemeToggle from '../components/ThemeToggle';

import { LuMenu } from "react-icons/lu";


function Header({
  sidebarOpen,
  setSidebarOpen,
  variant = 'default',
}) {

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === "true");

  const [searchModalOpen, setSearchModalOpen] = useState(false)

  useEffect(() => {
     localStorage.setItem("sidebar-expanded", sidebarExpanded);
     if (sidebarExpanded) {
       document.querySelector("body").classList.add("sidebar-expanded");
     } else {
       document.querySelector("body").classList.remove("sidebar-expanded");
     }
   }, [sidebarExpanded]);

  return (
    <header className={`sticky top-0 before:absolute bg-green-100 before:inset-0 before:backdrop-blur-md max-lg:before:bg-white/90 dark:max-lg:before:bg-gray-800/90 
      before:-z-10 z-30 
      ${variant === 'v2' || variant === 'v3' ? 'before:bg-white after:absolute after:h-px after:inset-x-0 after:top-full after:bg-gray-200 dark:after:bg-gray-700/60 after:-z-10' : 'max-lg:shadow-xs lg:before:bg-gray-100/90 dark:lg:before:bg-gray-900/90'} 
      ${variant === 'v2' ? 'dark:before:bg-gray-800' : ''} ${variant === 'v3' ? 'dark:before:bg-gray-900' : ''}`}>
      <div className="px-4 sm:px-6 lg:px-8 shadow-md ">
        <div className={`flex items-center justify-between h-16 ${variant === 'v2' || variant === 'v3' ? '' : 'lg:border-b border-gray-200  dark:border-gray-700/60'}`}>

          {/* Expand / collapse button */}
          <div className="hidden lg:inline-flex 2xl:hidden justify-end  items-center">
            <div className="px-3 py-2">
              <button className="text-gray-500 hover:text-gray-500 dark:text-white p-1.5 shadow rounded dark:hover:text-white border border-gray-300 hover:border-gray-400"
                onClick={() => setSidebarExpanded(!sidebarExpanded)}
                >
                <LuMenu className="w-6 h-6 text-gray-500 hover:text-gray-400 inline-block dark:text-white" />
              </button>
            </div>
          </div>
          {/* Header: Left side */}
          <div className="flex">

            {/* Hamburger button */}
            <button
              className="lg:hidden text-gray-500 hover:text-gray-500 dark:text-white p-1 shadow rounded dark:hover:text-white border border-gray-300 hover:border-gray-400"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}
            >
              <span className="sr-only">Open sidebar</span>
              <LuMenu className="w-6 h-6 text-gray-500 hover:text-gray-400 inline-block dark:text-white" />
            </button>

          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            <div>
              <button
                className={`w-8 h-8 flex items-center justify-center hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800 rounded-full ml-3 ${searchModalOpen && 'bg-gray-200 dark:bg-gray-800'}`}
                onClick={(e) => { e.stopPropagation(); setSearchModalOpen(true); }}
                aria-controls="search-modal"
              >
                <span className="sr-only">Search</span>
                <svg
                  className="fill-current text-gray-500/80 dark:text-gray-400/80"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7ZM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Z" />
                  <path d="m13.314 11.9 2.393 2.393a.999.999 0 1 1-1.414 1.414L11.9 13.314a8.019 8.019 0 0 0 1.414-1.414Z" />
                </svg>
              </button>
              <SearchModal id="search-modal" searchId="search" modalOpen={searchModalOpen} setModalOpen={setSearchModalOpen} />
            </div>
            <Notifications align="right" />
            <Help align="right" />
            <ThemeToggle />
            {/*  Divider */}
            <hr className="w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none" />
            <UserMenu align="right" />

          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;