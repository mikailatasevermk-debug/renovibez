/**
 * Sanitization utility for chat messages to maintain anonymity
 * Filters out personal information while nameRevealed=false
 */

// Patterns to detect and censor
const EMAIL_PATTERN = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_PATTERN = /(\+?\d{1,4}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?[\d\s.-]{6,}/g;
const URL_PATTERN = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;

// Common contractor keywords to censor
const CONTRACTOR_KEYWORDS = [
  'bedrijf', 'company', 'bv', 'b.v.', 'ltd', 'limited', 'corp', 'corporation',
  'inc', 'incorporated', 'llc', 'gmbh', 'cv', 'vof', 'eenmanszaak',
  'contact', 'bel', 'call', 'phone', 'telefoon', 'mail', 'email',
  'website', 'site', 'portfolio', 'facebook', 'instagram', 'linkedin',
  'kvk', 'btw', 'vat', 'chamber', 'kamer', 'handel'
];

// Dutch names patterns (common first names to detect)
const DUTCH_NAMES = [
  'jan', 'piet', 'kees', 'henk', 'bert', 'cor', 'wim', 'ton', 'rob', 'mark',
  'peter', 'paul', 'john', 'erik', 'marco', 'dennis', 'patrick', 'michael',
  'sandra', 'ingrid', 'marieke', 'susan', 'nicole', 'linda', 'patricia',
  'maria', 'anna', 'marianne', 'caroline', 'monique', 'anja', 'brigitte'
];

/**
 * Sanitizes message content when anonymity is required
 */
export function sanitizeMessage(content: string, isAnonymous: boolean = true): {
  sanitized: string;
  isFiltered: boolean;
} {
  if (!isAnonymous) {
    return {
      sanitized: content,
      isFiltered: false
    };
  }

  let sanitized = content;
  let isFiltered = false;

  // Remove emails
  if (EMAIL_PATTERN.test(sanitized)) {
    sanitized = sanitized.replace(EMAIL_PATTERN, '•••');
    isFiltered = true;
  }

  // Remove phone numbers
  if (PHONE_PATTERN.test(sanitized)) {
    sanitized = sanitized.replace(PHONE_PATTERN, '•••');
    isFiltered = true;
  }

  // Remove URLs
  if (URL_PATTERN.test(sanitized)) {
    sanitized = sanitized.replace(URL_PATTERN, '•••');
    isFiltered = true;
  }

  // Remove contractor keywords (case-insensitive)
  CONTRACTOR_KEYWORDS.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    if (regex.test(sanitized)) {
      sanitized = sanitized.replace(regex, '•••');
      isFiltered = true;
    }
  });

  // Remove potential names (case-insensitive, but be careful with false positives)
  DUTCH_NAMES.forEach(name => {
    // Only replace if it appears to be used as a name (capitalized, standalone word)
    const regex = new RegExp(`\\b${name.charAt(0).toUpperCase() + name.slice(1)}\\b`, 'g');
    if (regex.test(sanitized)) {
      sanitized = sanitized.replace(regex, '•••');
      isFiltered = true;
    }
  });

  // Remove potential company names (words ending with typical business suffixes)
  const businessSuffixPattern = /\b\w+\s*(bv|b\.v\.|ltd|limited|corp|corporation|inc|incorporated|llc|cv|vof)\b/gi;
  if (businessSuffixPattern.test(sanitized)) {
    sanitized = sanitized.replace(businessSuffixPattern, '••• (bedrijfsnaam)');
    isFiltered = true;
  }

  // Clean up multiple consecutive censored parts
  sanitized = sanitized.replace(/•••(\s*•••)+/g, '•••');

  return {
    sanitized: sanitized.trim(),
    isFiltered
  };
}

/**
 * Detects if a message contains potentially revealing information
 */
export function containsPersonalInfo(content: string): boolean {
  const lowerContent = content.toLowerCase();
  
  return (
    EMAIL_PATTERN.test(content) ||
    PHONE_PATTERN.test(content) ||
    URL_PATTERN.test(content) ||
    CONTRACTOR_KEYWORDS.some(keyword => lowerContent.includes(keyword)) ||
    DUTCH_NAMES.some(name => lowerContent.includes(name))
  );
}

/**
 * Generates anonymous contractor label (A, B, C)
 */
export function getContractorLabel(index: number): string {
  const labels = ['A', 'B', 'C'];
  return labels[index] || `${index + 1}`;
}

/**
 * Validates if user can send message (basic rate limiting)
 */
export function validateMessageSending(userId: string, recentMessages: any[]): {
  canSend: boolean;
  reason?: string;
} {
  const now = new Date();
  const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
  
  const recentUserMessages = recentMessages.filter(msg => 
    (msg.authorUserId === userId || msg.authorContractorId === userId) &&
    new Date(msg.createdAt) > fiveMinutesAgo
  );

  // Max 20 messages per 5 minutes
  if (recentUserMessages.length >= 20) {
    return {
      canSend: false,
      reason: 'Te veel berichten verzonden. Probeer het over een paar minuten opnieuw.'
    };
  }

  // Max 5 messages per minute
  const veryRecentMessages = recentUserMessages.filter(msg => 
    new Date(msg.createdAt) > oneMinuteAgo
  );
  
  if (veryRecentMessages.length >= 5) {
    return {
      canSend: false,
      reason: 'Te snel achter elkaar berichten verzonden. Even wachten a.u.b.'
    };
  }

  return { canSend: true };
}