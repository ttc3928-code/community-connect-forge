/**
 * TEMPORARY preview access flag.
 *
 * When enabled, the app renders as if a "guest" user is signed in so the whole
 * UX can be explored without logging in. Nothing about the real auth system is
 * removed — flip this to `false` (or set VITE_PREVIEW_GUEST_MODE=false) to
 * restore the normal login requirement everywhere.
 */
export const PREVIEW_GUEST_MODE =
  import.meta.env['VITE_PREVIEW_GUEST_MODE'] !== 'false';

export const GUEST_USER_ID = '00000000-0000-4000-8000-000000000001';

export const GUEST_USER = {
  id: GUEST_USER_ID,
  aud: 'authenticated',
  role: 'authenticated',
  email: 'guest@preview.local',
  app_metadata: { provider: 'preview' },
  user_metadata: { display_name: 'Guest (Preview)' },
  created_at: new Date(0).toISOString(),
} as const;
