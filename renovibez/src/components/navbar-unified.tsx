"use client";

import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Menu, Home, User, HardHat } from "lucide-react";
import AccountDropdown from "./account-dropdown";

interface NavbarUnifiedProps {
  onMobileMenuToggle: () => void;
}

export default function NavbarUnified({ onMobileMenuToggle }: NavbarUnifiedProps) {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const avatarRef = useRef<HTMLButtonElement>(null);

  const navigation = [
    { name: "Home", href: "/nl" },
    { name: "Inspiratie", href: "/nl/inspiratie" },
    { name: "Projecten", href: "/nl/projecten" },
    { name: "Gidsen", href: "/nl/gidsen" },
  ];

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/nl" className="flex items-center space-x-2 group">
            <Home className="h-8 w-8 text-terracotta transition-transform group-hover:rotate-12" />
            <span className="text-xl font-bold text-ink">Renovibez</span>
          </Link>

          {/* Center Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-ink hover:text-terracotta font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 rounded px-3 py-2 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-terracotta scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </Link>
            ))}
          </div>

          {/* Right Side - Auth */}
          <div className="flex items-center space-x-4">
            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-4">
              {status === "loading" ? (
                <div className="w-20 h-8 bg-muted animate-pulse rounded"></div>
              ) : session ? (
                <div className="relative">
                  <button
                    ref={avatarRef}
                    onClick={handleAvatarClick}
                    className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-terracotta/10 transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                  >
                    <div className="w-8 h-8 bg-terracotta/10 rounded-full flex items-center justify-center">
                      {session.user.role === "CONTRACTOR" ? (
                        <HardHat className="h-4 w-4 text-terracotta" />
                      ) : (
                        <User className="h-4 w-4 text-terracotta" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-ink max-w-32 truncate">
                      {session.user.name || session.user.email}
                    </span>
                  </button>
                  <AccountDropdown
                    isOpen={isDropdownOpen}
                    onClose={handleDropdownClose}
                    triggerRef={avatarRef}
                  />
                </div>
              ) : (
                <Link
                  href="/nl/login"
                  className="px-4 py-2 bg-terracotta text-white rounded-full hover:bg-terracotta/90 transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 font-medium"
                >
                  Inloggen
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={onMobileMenuToggle}
              className="md:hidden p-2 rounded-lg hover:bg-terracotta/10 transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 text-ink" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}