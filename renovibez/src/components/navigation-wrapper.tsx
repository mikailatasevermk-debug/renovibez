"use client";

import { useState } from "react";
import NavbarUnified from "./navbar-unified";
import Sidebar from "./sidebar";

export default function NavigationWrapper() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <NavbarUnified onMobileMenuToggle={handleMobileMenuToggle} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
    </>
  );
}