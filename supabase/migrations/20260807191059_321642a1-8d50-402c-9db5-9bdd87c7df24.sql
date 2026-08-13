CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  display_name text,
  avatar_url text,
  streak_count integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.habits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  icon text DEFAULT '📖',
  type text NOT NULL DEFAULT 'build' CHECK (type IN ('build', 'break')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.habits TO authenticated;
GRANT ALL ON public.habits TO service_role;
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own habits" ON public.habits FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own habits" ON public.habits FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own habits" ON public.habits FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own habits" ON public.habits FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.habit_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  habit_id uuid NOT NULL REFERENCES public.habits(id) ON DELETE CASCADE,
  completed_date date NOT NULL DEFAULT CURRENT_DATE,
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(habit_id, completed_date)
);
GRANT SELECT, INSERT, DELETE ON public.habit_completions TO authenticated;
GRANT ALL ON public.habit_completions TO service_role;
ALTER TABLE public.habit_completions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own completions" ON public.habit_completions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own completions" ON public.habit_completions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND EXISTS (SELECT 1 FROM public.habits h WHERE h.id = habit_id AND h.user_id = auth.uid()));
CREATE POLICY "Users can delete their own completions" ON public.habit_completions FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.journal_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL DEFAULT 'reflection',
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.journal_entries TO authenticated;
GRANT ALL ON public.journal_entries TO service_role;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own entries" ON public.journal_entries FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own entries" ON public.journal_entries FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own entries" ON public.journal_entries FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own entries" ON public.journal_entries FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.notification_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  habit_reminders_enabled boolean NOT NULL DEFAULT false,
  reminder_time time NOT NULL DEFAULT '09:00:00',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.notification_preferences TO authenticated;
GRANT ALL ON public.notification_preferences TO service_role;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own notification preferences" ON public.notification_preferences FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own notification preferences" ON public.notification_preferences FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own notification preferences" ON public.notification_preferences FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.push_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  endpoint text NOT NULL,
  p256dh text NOT NULL,
  auth text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, endpoint)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.push_subscriptions TO authenticated;
GRANT ALL ON public.push_subscriptions TO service_role;
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own push subscriptions" ON public.push_subscriptions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own push subscriptions" ON public.push_subscriptions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own push subscriptions" ON public.push_subscriptions FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own push subscriptions" ON public.push_subscriptions FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_journal_entries_updated_at BEFORE UPDATE ON public.journal_entries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_notification_preferences_updated_at BEFORE UPDATE ON public.notification_preferences FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_push_subscriptions_updated_at BEFORE UPDATE ON public.push_subscriptions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$ BEGIN INSERT INTO public.profiles (user_id, display_name) VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email)) ON CONFLICT (user_id) DO NOTHING; RETURN NEW; END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.calculate_user_streak(p_user_id uuid) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE current_streak integer := 0; max_streak integer := 0; prev_date date := NULL; completion_date date; today date := CURRENT_DATE;
BEGIN
  IF auth.uid() IS DISTINCT FROM p_user_id THEN RAISE EXCEPTION 'Not authorized'; END IF;
  FOR completion_date IN SELECT DISTINCT completed_date FROM habit_completions WHERE user_id = p_user_id ORDER BY completed_date DESC LOOP
    IF prev_date IS NULL THEN IF completion_date = today OR completion_date = today - 1 THEN current_streak := 1; prev_date := completion_date; ELSE EXIT; END IF;
    ELSIF prev_date - completion_date = 1 THEN current_streak := current_streak + 1; prev_date := completion_date;
    ELSE EXIT; END IF;
  END LOOP;
  SELECT COALESCE(MAX(streak_length), 0) INTO max_streak FROM (SELECT COUNT(*) streak_length FROM (SELECT completed_date, completed_date - (ROW_NUMBER() OVER (ORDER BY completed_date))::integer grp FROM (SELECT DISTINCT completed_date FROM habit_completions WHERE user_id = p_user_id) dates) grouped GROUP BY grp) streaks;
  UPDATE profiles SET streak_count = current_streak, longest_streak = GREATEST(COALESCE(longest_streak, 0), max_streak, current_streak) WHERE user_id = p_user_id;
END; $$;
GRANT EXECUTE ON FUNCTION public.calculate_user_streak(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.trigger_update_streak() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$ BEGIN IF TG_OP = 'DELETE' THEN PERFORM calculate_user_streak(OLD.user_id); RETURN OLD; ELSE PERFORM calculate_user_streak(NEW.user_id); RETURN NEW; END IF; END; $$;
CREATE TRIGGER on_habit_completion_change AFTER INSERT OR DELETE ON public.habit_completions FOR EACH ROW EXECUTE FUNCTION public.trigger_update_streak();