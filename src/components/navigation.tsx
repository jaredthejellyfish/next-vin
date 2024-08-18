"use client";

import React, { useState } from "react";
import { Menu, X, Car } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white dark:bg-neutral-800 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4 font-bold">
          <Link href="/" className="flex items-center">
            <Car className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              VIN-Decode
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="py-2 px-3 text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded transition duration-300"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="py-2 px-3 text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded transition duration-300"
            >
              About
            </Link>
            <Link
              href="/services"
              className="py-2 px-3 text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded transition duration-300"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="py-2 px-3 text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded transition duration-300"
            >
              Contact
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="mobile-menu-button"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-neutral-200" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-neutral-200" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "md:hidden pb-2 transition-all duration-300 font-bold",
          isOpen ? "block" : "hidden"
        )}
      >
        <Link
          href="/"
          className="block py-2 px-4 text-sm text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="block py-2 px-4 text-sm text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700"
        >
          About
        </Link>
        <Link
          href="/services"
          className="block py-2 px-4 text-sm text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700"
        >
          Services
        </Link>
        <Link
          href="/contact"
          className="block py-2 px-4 text-sm text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
