/** Shared phone-number input handling for accountability contacts. */

export const MIN_PHONE_DIGITS = 10; // NANP local number without country code
export const MAX_PHONE_DIGITS = 15; // E.164 maximum

/** Strip disallowed characters, keep at most one leading "+", cap digit count. */
export const sanitizePhoneInput = (raw: string): string => {
  const hasPlus = raw.trim().startsWith('+');
  let digits = raw.replace(/\D/g, '').slice(0, MAX_PHONE_DIGITS);
  const cleaned = raw
    .replace(/[^\d\s()\-.]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trimStart();

  // Rebuild while preserving the user's separators but honoring the digit cap.
  let out = '';
  for (const ch of cleaned) {
    if (/\d/.test(ch)) {
      if (digits.length === 0) break;
      digits = digits.slice(1);
      out += ch;
    } else {
      out += ch;
    }
  }
  return (hasPlus ? '+' : '') + out;
};

export const countPhoneDigits = (value: string) => value.replace(/\D/g, '').length;

/** Returns an error message, or null when the number is valid. */
export const validatePhone = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return 'Phone number is required for 1-tap SOS alerts.';
  if (!/^\+?[\d\s()\-.]+$/.test(trimmed))
    return 'Only digits, spaces, +, -, ( ) and . are allowed.';
  const digits = countPhoneDigits(trimmed);
  if (digits < MIN_PHONE_DIGITS)
    return `Enter ${MIN_PHONE_DIGITS} digits including the area code (${digits}/${MIN_PHONE_DIGITS}).`;
  if (digits > MAX_PHONE_DIGITS)
    return `Phone number can be at most ${MAX_PHONE_DIGITS} digits.`;
  return null;
};

/** Digits + optional leading "+" only, for tel:/sms: links. */
export const toDialable = (value: string): string => {
  const trimmed = value.trim();
  const plus = trimmed.startsWith('+') ? '+' : '';
  return plus + trimmed.replace(/\D/g, '');
};
