"use client";

import { motion, MotionProps } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode, useEffect, useState } from "react";
import { animation } from "@/lib/design-system";

// Fade In Animation
export const FadeIn = ({ 
  children, 
  delay = 0,
  duration = animation.duration.normal,
  ...props 
}: { 
  children: ReactNode; 
  delay?: number;
  duration?: number;
} & MotionProps) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration,
        delay,
        ease: animation.easing.smooth,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Stagger Container
export const StaggerContainer = ({ 
  children,
  stagger = animation.stagger.normal,
  className,
  ...props
}: {
  children: ReactNode;
  stagger?: number;
  className?: string;
} & Omit<MotionProps, 'className'>) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Stagger Item
export const StaggerItem = ({ 
  children,
  ...props
}: {
  children: ReactNode;
} & MotionProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: animation.duration.normal,
            ease: animation.easing.smooth,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Scale on Hover
export const ScaleOnHover = ({ 
  children,
  scale = 1.02,
  ...props
}: {
  children: ReactNode;
  scale?: number;
} & MotionProps) => {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: scale - 0.02 }}
      transition={animation.easing.spring}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Pulse Animation
export const Pulse = ({ 
  children,
  ...props
}: {
  children: ReactNode;
} & MotionProps) => {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Slide In From Side
export const SlideIn = ({
  children,
  direction = "left",
  delay = 0,
  ...props
}: {
  children: ReactNode;
  direction?: "left" | "right" | "top" | "bottom";
  delay?: number;
} & MotionProps) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const variants = {
    left: { x: -50, opacity: 0 },
    right: { x: 50, opacity: 0 },
    top: { y: -50, opacity: 0 },
    bottom: { y: 50, opacity: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={variants[direction]}
      animate={inView ? { x: 0, y: 0, opacity: 1 } : variants[direction]}
      transition={{
        duration: animation.duration.normal,
        delay,
        ease: animation.easing.smooth,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Respect reduced motion preference
export const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return reducedMotion;
};