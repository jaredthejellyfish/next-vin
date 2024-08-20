"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Menu, X, Car, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NavLink = ({
  href,
  children,
  current,
}: {
  href: string;
  children: React.ReactNode;
  current?: boolean;
}) => (
  <Link
    href={href}
    className={cn(
      "py-2 px-3 text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded transition duration-300",
      current && "text-blue-600 dark:text-blue-400"
    )}
  >
    {children}
  </Link>
);

const MobileNavLink = ({
  href,
  children,
  onClick,
  current,
}: {
  href: string;
  children: React.ReactNode;
  current?: boolean;
  onClick: () => void;
}) => (
  <Link
    href={href}
    className={cn(
      "block py-2 px-4 text-sm text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700",
      current && "text-blue-600 dark:text-blue-400"
    )}
    onClick={onClick}
  >
    {children}
  </Link>
);

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    const isDark = theme === "dark";
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-8 h-8 rounded-full bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-neutral-200 hover:bg-gray-300 dark:hover:bg-neutral-600 transition duration-300 relative"
      aria-label="Toggle theme"
    >
      <Sun className="absolute h-[1.2rem] w-[1.2rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
};

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "unset";
    }
    return () => {
      body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <nav className="bg-white dark:bg-neutral-800 shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4 font-bold">
            <Link href="/" className="flex items-center">
              <Car className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                VIN-Decode
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              {links.map(({ href, label }) => (
                <NavLink key={href} href={href} current={pathname === href}>
                  {label}
                </NavLink>
              ))}
            </div>
            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={toggleMenu}
                className="p-2"
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
        {isOpen && (
          <div className="md:hidden font-bold">
            {links.map(({ href, label }) => (
              <MobileNavLink
                key={href}
                href={href}
                onClick={toggleMenu}
                current={pathname === href}
              >
                {label}
              </MobileNavLink>
            ))}
          </div>
        )}
      </nav>
      {isOpen && (
        <div
          className="fixed inset-0 bg-neutral-900/80 z-40 md:hidden blur"
          onClick={toggleMenu}
        />
      )}
    </>
  );
};

export default NavBar;
