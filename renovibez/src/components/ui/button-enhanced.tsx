import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-terracotta text-white shadow-md hover:bg-terracotta/90 hover:shadow-lg focus-visible:ring-terracotta",
        destructive:
          "bg-red-500 text-white shadow-md hover:bg-red-600 hover:shadow-lg focus-visible:ring-red-500",
        outline:
          "border-2 border-terracotta bg-transparent text-terracotta shadow-sm hover:bg-terracotta hover:text-white hover:shadow-md focus-visible:ring-terracotta",
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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
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

    const baseClassName = cn(buttonVariants({ variant, size, className }));
    
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={baseClassName}
          onClick={handleClick}
          {...props}
        />
      );
    }

    return (
      <motion.button
        ref={ref}
        className={baseClassName}
        onClick={handleClick}
        disabled={props.disabled}
        type={props.type || "button"}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {props.children}
        {ripple && ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              background: `radial-gradient(circle at ${ripple.x}px ${ripple.y}px, rgba(255, 255, 255, 0.5) 0%, transparent 70%)`,
            }}
          />
        ))}
      </motion.button>
    );
  }
);
ButtonEnhanced.displayName = "ButtonEnhanced";

export { ButtonEnhanced, buttonVariants };