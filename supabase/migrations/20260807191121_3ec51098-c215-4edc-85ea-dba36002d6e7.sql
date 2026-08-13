REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.trigger_update_streak() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.calculate_user_streak(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.calculate_user_streak(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.calculate_user_streak(p_user_id uuid) RETURNS void LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
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
REVOKE ALL ON FUNCTION public.calculate_user_streak(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.calculate_user_streak(uuid) TO authenticated;