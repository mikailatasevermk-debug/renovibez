"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { ButtonEnhanced } from "@/components/ui/button-enhanced";
import { Home, Menu, X, User, LogOut, HardHat } from "lucide-react";
import { animation } from "@/lib/design-system";

// Simplified focus trap hook
const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      
      const container = containerRef.current;
      if (!container) return;

      const focusableElements = container.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);
    
    // Focus first element after a small delay
    setTimeout(() => {
      const container = containerRef.current;
      if (container) {
        const firstFocusable = container.querySelector('button, a[href]') as HTMLElement;
        firstFocusable?.focus();
      }
    }, 100);

    return () => {
      document.removeEventListener("keydown", handleTabKey);
    };
  }, [isActive]);

  return containerRef;
};

export default function HeaderEnhanced() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const focusTrapRef = useFocusTrap(isMenuOpen);

  const navigation = [
    { name: "Home", href: "/nl" },
    { name: "Inspiratie", href: "/nl/inspiratie" },
    { name: "Projecten", href: "/nl/projecten" },
    { name: "Gidsen", href: "/nl/gidsen" },
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: "/nl" });
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header 
        className="fixed top-0 w-full z-50 glass-nav backdrop-blur-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: animation.duration.normal, ease: animation.easing.smooth }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/nl" className="flex items-center space-x-2 group">
                <Home className="h-8 w-8 text-terracotta transition-transform group-hover:rotate-12" />
                <span className="text-xl font-bold text-ink">Renovibez</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8" role="navigation">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: animation.duration.normal,
                  }}
                >
                  <Link
                    href={item.href}
                    className="relative text-ink hover:text-terracotta font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 rounded px-2 py-1 group"
                  >
                    {item.name}
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-terracotta group-hover:w-full transition-all duration-300"
                      whileHover={{ width: "100%" }}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {status === "loading" ? (
                <div className="w-20 h-8 bg-muted animate-pulse rounded"></div>
              ) : session ? (
                <motion.div 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: animation.duration.normal }}
                >
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
                      <ButtonEnhanced variant="outline" size="sm">
                        Dashboard
                      </ButtonEnhanced>
                    </Link>
                  )}
                  <ButtonEnhanced 
                    variant="ghost" 
                    size="sm"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4" />
                  </ButtonEnhanced>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: animation.duration.normal }}
                >
                  <Link href="/nl/login">
                    <ButtonEnhanced variant="ghost">
                      Inloggen
                    </ButtonEnhanced>
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: animation.duration.fast }}
                  >
                    <X className="h-6 w-6 text-ink" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: animation.duration.fast }}
                  >
                    <Menu className="h-6 w-6 text-ink" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.button
              className="fixed inset-0 bg-black/50 z-40 md:hidden cursor-default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: animation.duration.fast }}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              tabIndex={-1}
            />

            {/* Sidebar */}
            <motion.div
              ref={focusTrapRef}
              className="fixed right-0 top-0 h-full w-80 max-w-[80vw] bg-white z-50 md:hidden shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              role="navigation"
              aria-label="Mobile navigation"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-border">
                  <span className="text-xl font-bold text-ink">Menu</span>
                  <motion.button
                    className="p-2 rounded-lg hover:bg-terracotta/10 focus:outline-none focus:ring-2 focus:ring-terracotta"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Close menu"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="h-6 w-6 text-ink" />
                  </motion.button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-2">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: index * 0.05,
                          duration: animation.duration.fast,
                        }}
                      >
                        <Link
                          href={item.href}
                          className="block px-4 py-3 text-ink hover:text-terracotta hover:bg-terracotta/10 font-medium transition-all rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Auth Section */}
                  <div className="mt-8 pt-8 border-t border-border space-y-2">
                    {session ? (
                      <>
                        <motion.div 
                          className="flex items-center space-x-2 px-4 py-3 bg-terracotta/5 rounded-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {session.user.role === "CONTRACTOR" ? (
                            <HardHat className="h-4 w-4 text-terracotta" />
                          ) : (
                            <User className="h-4 w-4 text-terracotta" />
                          )}
                          <span className="text-sm font-medium text-ink">
                            {session.user.name || session.user.email}
                          </span>
                        </motion.div>
                        {session.user.role === "CONTRACTOR" && (
                          <Link href="/nl/contractor/dashboard" onClick={() => setIsMenuOpen(false)}>
                            <ButtonEnhanced variant="outline" className="w-full justify-start">
                              <HardHat className="mr-2 h-4 w-4" />
                              Dashboard
                            </ButtonEnhanced>
                          </Link>
                        )}
                        <ButtonEnhanced 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => {
                            setIsMenuOpen(false);
                            handleSignOut();
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Uitloggen
                        </ButtonEnhanced>
                      </>
                    ) : (
                      <Link href="/nl/login" onClick={() => setIsMenuOpen(false)}>
                        <ButtonEnhanced variant="ghost" className="w-full justify-start">
                          <User className="mr-2 h-4 w-4" />
                          Inloggen
                        </ButtonEnhanced>
                      </Link>
                    )}
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}