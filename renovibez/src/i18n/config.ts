export const locales = ['en', 'nl'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  nl: 'Nederlands',
};

export const pathnames = {
  '/': '/',
  '/inspiratie': {
    en: '/inspiration',
    nl: '/inspiratie'
  },
  '/projecten': {
    en: '/projects', 
    nl: '/projecten'
  },
  '/gidsen': {
    en: '/guides',
    nl: '/gidsen'
  },
  '/login': '/login',
  '/register': '/register'
} as const;