ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS partner_name text,
  ADD COLUMN IF NOT EXISTS partner_phone text,
  ADD COLUMN IF NOT EXISTS sos_attach_location boolean NOT NULL DEFAULT false;