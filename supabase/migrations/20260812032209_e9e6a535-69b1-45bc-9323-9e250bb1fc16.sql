ALTER TABLE public.habits DROP CONSTRAINT IF EXISTS habits_type_check;
UPDATE public.habits SET type = 'stop' WHERE type = 'break';
ALTER TABLE public.habits ADD CONSTRAINT habits_type_check CHECK (type IN ('build','stop'));