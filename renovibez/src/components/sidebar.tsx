"use client";

import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Home, X, User, HardHat, LogOut, Settings, Calendar, MessageSquare } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { data: session } = useSession();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const navigationItems = [
    { name: "Home", href: "/nl", icon: Home },
    { name: "Inspiratie", href: "/nl/inspiratie", icon: Settings },
    { name: "Projecten", href: "/nl/projecten", icon: Calendar },
    { name: "Gidsen", href: "/nl/gidsen", icon: User },
  ];

  const consumerLinks = [
    { href: "/nl/account", label: "Profiel", icon: User },
    { href: "/nl/matches", label: "Mijn Matches", icon: MessageSquare },
    { href: "/nl/visits", label: "Mijn Bezoeken", icon: Calendar },
  ];

  const contractorLinks = [
    { href: "/nl/contractor/dashboard", label: "Dashboard", icon: HardHat },
    { href: "/nl/contractor/matches", label: "Matches", icon: MessageSquare },
    { href: "/nl/account", label: "Profiel", icon: User },
  ];

  const accountLinks = session?.user.role === "CONTRACTOR" ? contractorLinks : consumerLinks;
  const totalFocusableItems = navigationItems.length + (session ? accountLinks.length + 1 : 2); // +1 for logout or +2 for login/register

  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % totalFocusableItems);
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + totalFocusableItems) % totalFocusableItems);
      }

      if (e.key === "Enter" && focusedIndex >= 0) {
        e.preventDefault();
        const focusableElements = sidebarRef.current?.querySelectorAll('a, button');
        (focusableElements?.[focusedIndex] as HTMLElement)?.click();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    // Prevent scroll on body when sidebar is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, focusedIndex, totalFocusableItems, onClose]);

  const handleLinkClick = () => {
    onClose();
  };

  const handleSignOut = () => {
    onClose();
    signOut({ callbackUrl: "/nl" });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed right-0 top-0 h-full w-80 max-w-[80vw] bg-white/75 backdrop-blur-md border-l border-white/20 z-50 md:hidden shadow-2xl"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/20">
            <div className="flex items-center space-x-2">
              <Home className="h-6 w-6 text-terracotta" />
              <span className="text-lg font-bold text-ink">Renovibez</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-terracotta/10 transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-ink" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 space-y-2">
            {navigationItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-ink hover:bg-terracotta/10 focus:outline-none focus:bg-terracotta/10 ${
                    focusedIndex === index ? "bg-terracotta/10" : ""
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Account Section */}
          <div className="border-t border-white/20 pt-6 space-y-3">
            {session ? (
              <>
                {/* User Info */}
                <div className="flex items-center space-x-3 px-4 py-3 bg-terracotta/5 rounded-xl">
                  <div className="w-8 h-8 bg-terracotta/10 rounded-full flex items-center justify-center">
                    {session.user.role === "CONTRACTOR" ? (
                      <HardHat className="h-4 w-4 text-terracotta" />
                    ) : (
                      <User className="h-4 w-4 text-terracotta" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">
                      {session.user.name || session.user.email}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {session.user.role?.toLowerCase()}
                    </p>
                  </div>
                </div>

                {/* Account Links */}
                {accountLinks.map((link, index) => {
                  const IconComponent = link.icon;
                  const globalIndex = navigationItems.length + index;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={handleLinkClick}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-ink hover:bg-terracotta/10 focus:outline-none focus:bg-terracotta/10 ${
                        focusedIndex === globalIndex ? "bg-terracotta/10" : ""
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  );
                })}

                {/* Logout */}
                <button
                  onClick={handleSignOut}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-ink hover:bg-terracotta/10 focus:outline-none focus:bg-terracotta/10 ${
                    focusedIndex === navigationItems.length + accountLinks.length ? "bg-terracotta/10" : ""
                  }`}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="font-medium">Uitloggen</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/nl/login"
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-ink hover:bg-terracotta/10 focus:outline-none focus:bg-terracotta/10 ${
                    focusedIndex === navigationItems.length ? "bg-terracotta/10" : ""
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span className="font-medium">Inloggen</span>
                </Link>
                <Link
                  href="/nl/register"
                  onClick={handleLinkClick}
                  className={`flex items-center justify-center px-4 py-3 rounded-xl bg-terracotta text-white hover:bg-terracotta/90 transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta/50 font-medium ${
                    focusedIndex === navigationItems.length + 1 ? "ring-2 ring-terracotta/50" : ""
                  }`}
                >
                  Registreren
                </Link>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="pt-4 text-center">
            <p className="text-xs text-muted-foreground">© 2024 Renovibez</p>
          </div>
        </div>
      </div>
    </>
  );
}