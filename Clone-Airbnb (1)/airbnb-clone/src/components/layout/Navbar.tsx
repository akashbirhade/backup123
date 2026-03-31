import type React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';

const Navbar: React.FC = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-none">
            <Link to="/" className="text-[#FF385C]">
              <Logo />
            </Link>
          </div>

          {/* Search Bar */}
          <div
            className={`${isSearchActive ? 'bg-white shadow-lg border rounded-full' : 'border rounded-full bg-white shadow-sm'}
                      flex items-center px-4 h-12 transition-all hover:shadow-md cursor-pointer`}
            onClick={() => setIsSearchActive(true)}
          >
            <div className="pr-4 border-r">
              <span className="font-medium text-sm">Anywhere</span>
            </div>
            <div className="px-4 border-r">
              <span className="font-medium text-sm">Any week</span>
            </div>
            <div className="pl-4 pr-2 flex items-center">
              <span className="text-gray-500 text-sm">Add guests</span>
              <button className="ml-2 bg-[#FF385C] p-2 rounded-full text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center">
            <div className="mr-4">
              <Link to="/host" className="font-medium text-sm hover:bg-gray-100 px-4 py-3 rounded-full">
                Airbnb your home
              </Link>
            </div>
            <div className="relative">
              <button
                className="flex items-center border rounded-full p-1 hover:shadow-md transition"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <div className="pl-2 pr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <div className="bg-gray-500 text-white rounded-full h-8 w-8 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </button>

              {/* Profile Menu Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 font-medium">Sign up</a>
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Log in</a>
                  </div>
                  <div className="border-t py-2">
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Airbnb your home</a>
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Host an experience</a>
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Help</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
