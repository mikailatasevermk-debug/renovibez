"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const Sheet: React.FC<SheetProps> = ({ open, onOpenChange, children }) => {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => onOpenChange?.(false)}
        />
      )}
      {children}
    </>
  );
};

const SheetContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { side?: "left" | "right" }
>(({ className, side = "right", children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out",
      side === "right" && "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
      side === "left" && "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
SheetContent.displayName = "SheetContent";

const SheetTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn("renovibez-focus", className)}
    {...props}
  >
    {children}
  </button>
));
SheetTrigger.displayName = "SheetTrigger";

export { Sheet, SheetContent, SheetTrigger };