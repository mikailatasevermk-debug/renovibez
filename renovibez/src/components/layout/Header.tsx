"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Home, Menu, X, User, LogOut, HardHat } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const navigation = [
    { name: "Home", href: "/nl" },
    { name: "Inspiratie", href: "/nl/inspiratie" },
    { name: "Projecten", href: "/nl/projecten" },
    { name: "Gidsen", href: "/nl/gidsen" },
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: "/nl" });
  };

  return (
    <header className="fixed top-0 w-full z-50 glass-nav">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/nl" className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-terracotta" />
            <span className="text-xl font-bold text-ink">Renovibez</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8" role="navigation">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-ink hover:text-terracotta font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 rounded-sm"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {status === "loading" ? (
              <div className="w-20 h-8 bg-muted animate-pulse rounded"></div>
            ) : session ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {session.user.role === "CONTRACTOR" ? (
                    <HardHat className="h-4 w-4 text-terracotta" />
                  ) : (
                    <User className="h-4 w-4 text-terracotta" />
                  )}
                  <span className="text-sm font-medium text-ink">
                    {session.user.name || session.user.email}
                  </span>
                </div>
                {session.user.role === "CONTRACTOR" && (
                  <Link href="/nl/contractor/dashboard">
                    <Button variant="outline" size="sm" className="border-terracotta text-terracotta hover:bg-terracotta/10">
                      Dashboard
                    </Button>
                  </Link>
                )}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleSignOut}
                  className="text-muted-foreground hover:text-terracotta"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <Link href="/nl/login">
                  <Button variant="ghost" className="text-ink hover:text-terracotta">
                    Inloggen
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-ink" />
            ) : (
              <Menu className="h-6 w-6 text-ink" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4" role="navigation">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-ink hover:text-terracotta font-medium transition-colors px-2 py-1 focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 rounded-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth Section */}
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                {session ? (
                  <>
                    <div className="flex items-center space-x-2 px-2 py-1">
                      {session.user.role === "CONTRACTOR" ? (
                        <HardHat className="h-4 w-4 text-terracotta" />
                      ) : (
                        <User className="h-4 w-4 text-terracotta" />
                      )}
                      <span className="text-sm font-medium text-ink">
                        {session.user.name || session.user.email}
                      </span>
                    </div>
                    {session.user.role === "CONTRACTOR" && (
                      <Link href="/nl/contractor/dashboard" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start border-terracotta text-terracotta hover:bg-terracotta/10">
                          <HardHat className="mr-2 h-4 w-4" />
                          Dashboard
                        </Button>
                      </Link>
                    )}
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-muted-foreground hover:text-terracotta"
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleSignOut();
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Uitloggen
                    </Button>
                  </>
                ) : (
                  <Link href="/nl/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-ink hover:text-terracotta">
                      <User className="mr-2 h-4 w-4" />
                      Inloggen
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}