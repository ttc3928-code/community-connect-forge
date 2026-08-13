import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { communityClient as supabase } from '@/lib/community-client';
import { useAuth } from '@/contexts/AuthContext';

export interface JournalEntry {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export const useJournalEntries = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['journal_entries', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as JournalEntry[];
    },
    enabled: !!user,
  });
};

export const useCreateJournalEntry = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ title, content, category, image_url }: { title: string; content: string; category: string; image_url?: string | null }) => {
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('journal_entries')
        .insert({ user_id: user.id, title, content, category, image_url: image_url || null })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journal_entries'] });
    },
  });
};

export const useUpdateJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, title, content, category, image_url }: { id: string; title: string; content: string; category: string; image_url?: string | null }) => {
      const { data, error } = await supabase
        .from('journal_entries')
        .update({ title, content, category, image_url: image_url !== undefined ? image_url : undefined })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journal_entries'] });
    },
  });
};

export const useDeleteJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journal_entries'] });
    },
  });
};
