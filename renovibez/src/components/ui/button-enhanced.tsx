"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-terracotta text-white shadow-md hover:bg-terracotta/90 focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2",
        destructive:
          "bg-red-500 text-white shadow-md hover:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2",
        outline:
          "border-2 border-terracotta bg-transparent text-terracotta hover:bg-terracotta hover:text-white focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2",
        secondary:
          "bg-beige text-ink shadow-sm hover:bg-beige/80 focus-visible:ring-2 focus-visible:ring-beige focus-visible:ring-offset-2",
        ghost:
          "hover:bg-terracotta/10 text-terracotta focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2",
        link: "text-terracotta underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  ripple?: boolean;
}

const ButtonEnhanced = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ripple = true, ...props }, ref) => {
    const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([]);
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple && !props.disabled) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();
        
        setRipples((prev) => [...prev, { x, y, id }]);
        
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);
      }
      
      props.onClick?.(e);
    };

    const Comp = asChild ? Slot : motion.button;
    
    const motionProps = !asChild ? {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: { type: "spring", stiffness: 400, damping: 25 },
    } : {};

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        onClick={handleClick}
        {...motionProps}
        {...props}
      >
        {props.children}
        {ripple && ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="absolute bg-white/30 rounded-full"
              style={{
                left: ripple.x,
                top: ripple.y,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ width: 0, height: 0 }}
              animate={{ width: 200, height: 200 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </motion.span>
        ))}
      </Comp>
    );
  }
);

ButtonEnhanced.displayName = "ButtonEnhanced";

export { ButtonEnhanced, buttonVariants };