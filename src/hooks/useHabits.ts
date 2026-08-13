import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { communityClient as supabase } from '@/lib/community-client';
import { useAuth } from '@/contexts/AuthContext';
import { format, startOfWeek, addDays } from 'date-fns';

export interface Habit {
  id: string;
  user_id: string;
  name: string;
  icon: string;
  type: 'build' | 'stop';
  created_at: string;
}

export interface HabitCompletion {
  id: string;
  user_id: string;
  habit_id: string;
  completed_date: string;
  created_at: string;
  note?: string | null;
}

export const useUpdateHabitNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ habitId, date, note }: { habitId: string; date: string; note: string }) => {
      const { error } = await supabase
        .from('habit_completions')
        .update({ note })
        .eq('habit_id', habitId)
        .eq('completed_date', date);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habit_completions'] });
    },
  });
};

export const useHabits = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['habits', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as Habit[];
    },
    enabled: !!user,
  });
};

export const useHabitCompletions = (weekStart?: Date) => {
  const { user } = useAuth();
  const start = weekStart || startOfWeek(new Date(), { weekStartsOn: 0 });
  const end = addDays(start, 6);

  return useQuery({
    queryKey: ['habit_completions', user?.id, format(start, 'yyyy-MM-dd')],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('habit_completions')
        .select('*')
        .eq('user_id', user.id)
        .gte('completed_date', format(start, 'yyyy-MM-dd'))
        .lte('completed_date', format(end, 'yyyy-MM-dd'));

      if (error) throw error;
      return data as HabitCompletion[];
    },
    enabled: !!user,
  });
};

export const useCreateHabit = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ name, icon, type }: { name: string; icon: string; type: 'build' | 'stop' }) => {
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('habits')
        .insert({ user_id: user.id, name, icon, type })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });
};

export const useDeleteHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (habitId: string) => {
      const { error } = await supabase
        .from('habits')
        .delete()
        .eq('id', habitId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      queryClient.invalidateQueries({ queryKey: ['habit_completions'] });
    },
  });
};

export const useToggleHabitCompletion = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ habitId, date, isCompleted }: { habitId: string; date: string; isCompleted: boolean }) => {
      if (!user) throw new Error('Not authenticated');

      if (isCompleted) {
        // Remove completion
        const { error } = await supabase
          .from('habit_completions')
          .delete()
          .eq('habit_id', habitId)
          .eq('completed_date', date);

        if (error) throw error;
      } else {
        // Add completion
        const { error } = await supabase
          .from('habit_completions')
          .insert({ user_id: user.id, habit_id: habitId, completed_date: date });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habit_completions'] });
    },
  });
};
