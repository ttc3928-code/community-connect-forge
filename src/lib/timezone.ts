/**
 * Reminder times are stored in UTC ("HH:MM:SS") but shown/edited in the
 * user's local time zone.
 */

const pad = (n: number) => String(n).padStart(2, '0');

/** "HH:MM[:SS]" in UTC -> "HH:MM" in local time */
export const utcTimeToLocal = (utcTime: string): string => {
  const [h, m] = utcTime.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return utcTime.slice(0, 5);
  const d = new Date();
  d.setUTCHours(h, m, 0, 0);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

/** "HH:MM" in local time -> "HH:MM:SS" in UTC */
export const localTimeToUtc = (localTime: string): string => {
  const [h, m] = localTime.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return `${localTime}:00`;
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:00`;
};

/** e.g. "America/Edmonton" — falls back to a GMT offset label */
export const getLocalTimeZoneLabel = (): string => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz) return tz.replace(/_/g, ' ');
  } catch {
    /* ignore */
  }
  const offset = -new Date().getTimezoneOffset();
  const sign = offset >= 0 ? '+' : '-';
  const abs = Math.abs(offset);
  return `GMT${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`;
};
