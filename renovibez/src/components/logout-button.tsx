"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  callbackUrl?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost";
}

export function LogoutButton({ 
  callbackUrl = "/nl", 
  children, 
  className,
  variant = "outline" 
}: LogoutButtonProps) {
  const handleSignOut = () => {
    signOut({ callbackUrl });
  };

  return (
    <Button 
      variant={variant}
      className={className}
      onClick={handleSignOut}
    >
      {children || (
        <>
          <LogOut className="mr-2 h-4 w-4" />
          Uitloggen
        </>
      )}
    </Button>
  );
}