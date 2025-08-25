// Design System Constants
export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '6rem',    // 96px
  '5xl': '8rem',    // 128px
} as const;

export const animation = {
  // Durations
  duration: {
    instant: 0.1,
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    slower: 0.7,
  },
  // Easings
  easing: {
    smooth: [0.4, 0.0, 0.2, 1],
    smoothOut: [0.0, 0.0, 0.2, 1],
    smoothIn: [0.4, 0.0, 1, 1],
    spring: { type: "spring", stiffness: 300, damping: 30 },
  },
  // Stagger
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
} as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const focus = {
  outline: '2px solid var(--terracotta)',
  outlineOffset: '2px',
  borderRadius: '0.375rem',
} as const;