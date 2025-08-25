"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { User, HardHat, LogOut, Settings, Calendar, MessageSquare } from "lucide-react";

interface AccountDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

export default function AccountDropdown({ isOpen, onClose, triggerRef }: AccountDropdownProps) {
  const { data: session } = useSession();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

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

  const links = session?.user.role === "CONTRACTOR" ? contractorLinks : consumerLinks;
  const totalItems = links.length + 1; // +1 for logout

  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        triggerRef.current?.focus();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % totalItems);
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + totalItems) % totalItems);
      }

      if (e.key === "Enter" && focusedIndex >= 0) {
        e.preventDefault();
        const items = dropdownRef.current?.querySelectorAll('[role="menuitem"]');
        (items?.[focusedIndex] as HTMLElement)?.click();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    // Focus first item when opened
    setTimeout(() => {
      setFocusedIndex(0);
    }, 100);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, focusedIndex, totalItems, onClose, triggerRef]);

  const handleSignOut = () => {
    onClose();
    signOut({ callbackUrl: "/nl" });
  };

  if (!isOpen || !session) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-64 bg-white/75 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl z-50 py-2"
      role="menu"
      aria-orientation="vertical"
    >
      {/* User Info */}
      <div className="px-4 py-3 border-b border-white/20">
        <div className="flex items-center space-x-3">
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
      </div>

      {/* Navigation Links */}
      <div className="py-1">
        {links.map((link, index) => {
          const IconComponent = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`flex items-center px-4 py-2 text-sm text-ink hover:bg-terracotta/10 transition-colors focus:outline-none focus:bg-terracotta/10 ${
                focusedIndex === index ? "bg-terracotta/10" : ""
              }`}
              role="menuitem"
              tabIndex={-1}
            >
              <IconComponent className="h-4 w-4 mr-3 text-muted-foreground" />
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <div className="py-1 border-t border-white/20">
        <button
          onClick={handleSignOut}
          className={`w-full flex items-center px-4 py-2 text-sm text-ink hover:bg-terracotta/10 transition-colors focus:outline-none focus:bg-terracotta/10 ${
            focusedIndex === links.length ? "bg-terracotta/10" : ""
          }`}
          role="menuitem"
          tabIndex={-1}
        >
          <LogOut className="h-4 w-4 mr-3 text-muted-foreground" />
          Uitloggen
        </button>
      </div>
    </div>
  );
}